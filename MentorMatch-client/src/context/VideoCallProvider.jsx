/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Peer from "simple-peer";
import { useAppSelector } from "@/redux/hooks";
import { getSocket } from "@/redux/features/chat/socket";
import { VideoCallContext } from "./VideoCallContext";

export const VideoCallProvider = ({ children, meetingId }) => {
  const socket = getSocket();
  const { user } = useAppSelector((state) => state.auth);

  // --- State ---
  const [stream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callStatus, setCallStatus] = useState("joining");
  const [remoteUserId, setRemoteUserId] = useState(null);
  const [mediaError, setMediaError] = useState(null);

  // Controls
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Remote Sync State
  const [remoteIsMuted, setRemoteIsMuted] = useState(false);
  const [remoteIsCameraOff, setRemoteIsCameraOff] = useState(false);

  const connectionRef = useRef();

  // This Ref holds the ACTUAL active hardware track.
  // We use this to kill the light reliably.
  const activeVideoTrack = useRef(null);

  // 1. Initialize on Mount
  useEffect(() => {
    if (!meetingId || !socket) return;

    let myLocalStream = null;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myLocalStream = currentStream;

        // Save reference to the initial live video track
        activeVideoTrack.current = currentStream.getVideoTracks()[0];

        socket.emit("join-meeting", { meetingId });
      })
      .catch((err) => {
        console.error("Media Error:", err);
        setMediaError("Failed to access camera/mic. Check permissions.");
      });

    // --- Socket Handlers ---
    const handleMeJoined = () => setCallStatus("waiting");

    const handleUserJoined = ({ userId }) => {
      initiateCall(userId, myLocalStream);
    };

    const handleCallMade = ({ signal, from }) => {
      setRemoteUserId(from);
      answerCall(signal, from, myLocalStream);
    };

    const handleCallAnswered = ({ signal }) => {
      setCallStatus("connected");
      connectionRef.current?.signal(signal);
    };

    const handleIceCandidate = ({ candidate }) => {
      connectionRef.current?.signal(candidate);
    };

    const handleMediaToggled = ({ type, status }) => {
      if (type === "audio") setRemoteIsMuted(status);
      if (type === "video") setRemoteIsCameraOff(status);
    };

    // Listeners
    socket.on("me-joined", handleMeJoined);
    socket.on("user-joined", handleUserJoined);
    socket.on("call-made", handleCallMade);
    socket.on("call-answered", handleCallAnswered);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("media-toggled", handleMediaToggled);

    // Cleanup
    return () => {
      socket.off("me-joined", handleMeJoined);
      socket.off("user-joined", handleUserJoined);
      socket.off("call-made", handleCallMade);
      socket.off("call-answered", handleCallAnswered);
      socket.off("ice-candidate", handleIceCandidate);
      socket.off("media-toggled", handleMediaToggled);

      if (myLocalStream) {
        myLocalStream.getTracks().forEach((track) => track.stop());
      }
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
    };
  }, [meetingId, socket]);

  // 2. WebRTC Functions
  const initiateCall = (idToCall, myStream) => {
    setCallStatus("connecting");
    setRemoteUserId(idToCall);

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream || stream,
    });

    peer.on("signal", (data) => {
      socket.emit("call-user", {
        userToCall: idToCall,
        signalData: data,
        fromName: user?.name,
        meetingId,
      });
    });

    peer.on("stream", (remStream) => {
      setRemoteStream(remStream);
      setCallStatus("connected");
    });

    // Ensure we update remote stream if they replace tracks
    peer.on("track", (track, stream) => {
      if (track.kind === "video") {
        setRemoteStream(new MediaStream([track, ...stream.getAudioTracks()]));
      }
    });

    connectionRef.current = peer;
  };

  const answerCall = (callerSignal, callerId, myStream) => {
    setCallStatus("connecting");

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream || stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answer-call", { signal: data, to: callerId, meetingId });
    });

    peer.on("stream", (remStream) => {
      setRemoteStream(remStream);
      setCallStatus("connected");
    });

    peer.on("track", (track, stream) => {
      if (track.kind === "video") {
        setRemoteStream(new MediaStream([track, ...stream.getAudioTracks()]));
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  // 3. Controls

  const toggleMute = () => {
    if (stream) {
      const track = stream.getAudioTracks()[0];
      if (track) {
        track.enabled = !track.enabled;
        const newStatus = !track.enabled;
        setIsMuted(newStatus);
        socket.emit("toggle-media", {
          meetingId,
          type: "audio",
          status: newStatus,
        });
      }
    }
  };

  // Robust Camera Toggle
  const toggleCamera = async () => {
    // CASE A: Turn ON (Get new stream & replace sender)
    if (isCameraOff) {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const newVideoTrack = newStream.getVideoTracks()[0];

        // 1. Find and replace the video track in the Peer Connection
        if (connectionRef.current) {
          // We search for the RTP Sender that handles video
          const senders = connectionRef.current._pc.getSenders();
          const videoSender = senders.find(
            (s) => s.track && s.track.kind === "video"
          );

          // If we found a sender (even if it's stopped/ended), we replace its track
          if (videoSender) {
            await videoSender.replaceTrack(newVideoTrack);
          } else {
            // If no video sender exists, we might need to add one (fallback)
            // However, simple-peer replaceTrack is safer if sender is missing
            const oldTrack = activeVideoTrack.current;
            if (oldTrack) {
              connectionRef.current.replaceTrack(
                oldTrack,
                newVideoTrack,
                stream
              );
            } else {
              // Worst case: just add it
              connectionRef.current.addTrack(newVideoTrack, stream);
            }
          }
        }

        // 2. Update Local State (Clean up dead tracks)
        setStream((prevStream) => {
          if (!prevStream) return newStream;
          const newStreamObj = new MediaStream(prevStream.getTracks());

          newStreamObj.getVideoTracks().forEach((t) => {
            t.stop();
            newStreamObj.removeTrack(t);
          });

          newStreamObj.addTrack(newVideoTrack);
          return newStreamObj;
        });

        // 3. Update active ref
        activeVideoTrack.current = newVideoTrack;

        setIsCameraOff(false);
        socket.emit("toggle-media", {
          meetingId,
          type: "video",
          status: false,
        });
      } catch (e) {
        console.error("Camera restart failed:", e);
        setMediaError("Could not restart camera.");
      }
    }
    // CASE B: Turn OFF (Hardware Kill)
    else {
      // 1. Kill the light using the Ref (Guaranteed to work)
      if (activeVideoTrack.current) {
        activeVideoTrack.current.enabled = false;
        activeVideoTrack.current.stop(); // Stops hardware
      }

      // 2. Also ensure any tracks in current stream object are stopped
      if (stream) {
        stream.getVideoTracks().forEach((track) => track.stop());

        // Update state to remove video track (UI turns to Avatar)
        setStream((prev) => {
          if (!prev) return null;
          return new MediaStream(prev.getAudioTracks()); // Return Audio Only
        });
      }

      setIsCameraOff(true);
      socket.emit("toggle-media", { meetingId, type: "video", status: true });
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      // Revert to Camera
      try {
        const cameraStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        const cameraTrack = cameraStream.getVideoTracks()[0];

        if (connectionRef.current) {
          const senders = connectionRef.current._pc.getSenders();
          const videoSender = senders.find((s) => s.track?.kind === "video");
          if (videoSender) await videoSender.replaceTrack(cameraTrack);
        }

        activeVideoTrack.current = cameraTrack;
        setStream(cameraStream);
        setIsScreenSharing(false);
      } catch (e) {
        console.error(e);
      }
    } else {
      // Start Share
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          cursor: true,
        });
        const screenTrack = screenStream.getVideoTracks()[0];

        screenTrack.onended = () => toggleScreenShare();

        if (connectionRef.current) {
          const senders = connectionRef.current._pc.getSenders();
          const videoSender = senders.find((s) => s.track?.kind === "video");
          if (videoSender) await videoSender.replaceTrack(screenTrack);
        }

        activeVideoTrack.current = screenTrack;
        setStream(screenStream);
        setIsScreenSharing(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const leaveMeeting = () => {
    connectionRef.current?.destroy();
    if (stream) stream.getTracks().forEach((track) => track.stop());
    window.location.href = "/dashboard/learner/bookings";
  };

  return (
    <VideoCallContext.Provider
      value={{
        stream,
        remoteStream,
        callStatus,
        remoteUserId,
        mediaError,
        isMuted,
        isCameraOff,
        isScreenSharing,
        remoteIsMuted,
        remoteIsCameraOff,
        toggleMute,
        toggleCamera,
        toggleScreenShare,
        leaveMeeting,
      }}
    >
      {children}
    </VideoCallContext.Provider>
  );
};
