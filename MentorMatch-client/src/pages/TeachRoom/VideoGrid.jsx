import { useState } from "react";
import { ParticipantVideo } from "./ParticipantVideo";
import { Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoGrid({ participants, viewMode, localState }) {
  const [selfViewMinimized, setSelfViewMinimized] = useState(false);

  const localParticipant = participants.find((p) => p.id === "1");
  const remoteParticipant = participants.find((p) => p.id !== "1");

  // Apply local state to local participant
  const localWithState = localParticipant
    ? {
        ...localParticipant,
        isMuted: localState.isMuted,
        isCameraOff: localState.isCameraOff,
        hasRaisedHand: localState.hasRaisedHand,
      }
    : null;

  if (viewMode === "speaker" && remoteParticipant) {
    return (
      <div className="flex-1 flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 md:p-6 bg-video-bg overflow-hidden">
        {/* Main Speaker */}
        <div className="flex-1 min-h-0">
          <ParticipantVideo
            participant={remoteParticipant}
            isLocal={false}
            size="large"
          />
        </div>

        {/* Self View */}
        {localWithState && (
          <div
            className={cn(
              "absolute z-10 transition-all duration-300 ease-in-out",
              selfViewMinimized
                ? "bottom-22 sm:bottom-22 right-2 sm:right-4 md:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-lg cursor-pointer"
                : "bottom-22 sm:bottom-22 right-2 sm:right-4 md:right-8 w-24 h-18 sm:w-36 sm:h-27 md:w-48 md:h-36 rounded-xl sm:rounded-2xl"
            )}
          >
            {selfViewMinimized ? (
              <button
                onClick={() => setSelfViewMinimized(false)}
                className="w-full h-full rounded-lg bg-transparent border border-white/30 shadow-lg flex items-center justify-center hover:bg-white/10 hover:border-white/50 transition-colors"
              >
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              </button>
            ) : (
              <div className="relative w-full h-full shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden group">
                <ParticipantVideo
                  participant={localWithState}
                  isLocal={true}
                  size="small"
                />
                <button
                  onClick={() => setSelfViewMinimized(true)}
                  className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // GRID VIEW
  return (
    <div className="flex-1 flex flex-col md:flex-row gap-2 sm:gap-3 md:gap-4 p-2 sm:p-4 md:p-6 bg-video-bg overflow-hidden">
      {/* Remote User */}
      {remoteParticipant && (
        <div className="flex-1 min-w-0 min-h-0">
          <ParticipantVideo
            participant={remoteParticipant}
            isLocal={false}
            size="large"
          />
        </div>
      )}

      {/* Local User */}
      {localWithState && (
        <div className="flex-1 min-w-0 min-h-0">
          <ParticipantVideo
            participant={localWithState}
            isLocal={true}
            size="large"
          />
        </div>
      )}
    </div>
  );
}
