import { useEffect, useRef } from "react";
import { Mic, MicOff, VideoOff, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function ParticipantVideo({ participant, isLocal, size = "large" }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;

    if (videoEl && participant.stream) {
      videoEl.srcObject = participant.stream;

      // Handle the play() promise to ignore AbortErrors (caused by rapid toggling)
      videoEl.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Video play failed:", error);
        }
      });
    }
  }, [participant.stream, participant.isCameraOff]);

  const initials = participant.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative rounded-xl sm:rounded-2xl overflow-hidden bg-participant-bg h-full w-full animate-scale-in",
        participant.isSpeaking &&
          !isLocal &&
          "ring-2 sm:ring-[3px] ring-success",
        size === "large" && "shadow-soft-lg"
      )}
    >
      {/* --- VIDEO LAYER --- */}
      {participant.isCameraOff ? (
        // Avatar View (Camera Off)
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
          <div
            className={cn(
              "rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-semibold text-white border border-white/10",
              size === "large"
                ? "w-16 h-16 text-2xl sm:w-20 sm:h-20 sm:text-3xl md:w-28 md:h-28 md:text-4xl"
                : "w-10 h-10 text-sm sm:w-14 sm:h-14 sm:text-lg"
            )}
          >
            {initials}
          </div>
        </div>
      ) : (
        // Video View (Camera On)
        <div className="absolute inset-0 bg-black">
          <video
            // The 'key' forces React to re-mount the video element
            // whenever the stream ID changes. This prevents frozen black screens.
            key={participant.stream?.id || "no-stream"}
            ref={videoRef}
            playsInline // Important for mobile browsers
            muted={isLocal} // Mute local to avoid feedback loop
            className={cn(
              "w-full h-full object-cover",
              isLocal && "transform scale-x-[-1]" // Mirror local video
            )}
          />
        </div>
      )}

      {/* Speaking Indicator Glow */}
      {participant.isSpeaking && !isLocal && (
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 sm:ring-[3px] ring-success/50 animate-pulse pointer-events-none" />
      )}

      {/* Bottom Info Bar */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent",
          size === "large" ? "p-2 sm:p-3 md:p-4" : "p-1.5 sm:p-2"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span
              className={cn(
                "text-white font-medium truncate",
                size === "large"
                  ? "text-xs sm:text-sm"
                  : "text-[10px] sm:text-xs"
              )}
            >
              {isLocal ? "You" : participant.name}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            {participant.isCameraOff && (
              <div
                className={cn(
                  "rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center",
                  size === "large" ? "w-5 h-5" : "w-4 h-4"
                )}
              >
                <VideoOff className="w-2.5 h-2.5 text-white" />
              </div>
            )}

            {participant.isMuted ? (
              <div
                className={cn(
                  "rounded-full bg-destructive/90 flex items-center justify-center",
                  size === "large" ? "w-5 h-5" : "w-4 h-4"
                )}
              >
                <MicOff className="w-2.5 h-2.5 text-white" />
              </div>
            ) : (
              <div
                className={cn(
                  "rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center",
                  size === "large" ? "w-5 h-5" : "w-4 h-4"
                )}
              >
                <Mic className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
