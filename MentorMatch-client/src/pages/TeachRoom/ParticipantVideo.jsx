import { Mic, MicOff, VideoOff, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function ParticipantVideo({ participant, isLocal, size = "large" }) {
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
      {/* Video or Avatar */}
      {participant.isCameraOff ? (
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 sm:gap-3 text-slate-400">
            <User
              className={cn(
                size === "large"
                  ? "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                  : "w-8 h-8 sm:w-10 sm:h-10"
              )}
            />
            {size === "large" && (
              <span className="text-xs sm:text-sm opacity-60 hidden sm:block">
                Camera Preview
              </span>
            )}
          </div>
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
                  size === "large"
                    ? "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    : "w-4 h-4 sm:w-5 sm:h-5"
                )}
              >
                <VideoOff
                  className={cn(
                    size === "large"
                      ? "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5",
                    "text-white"
                  )}
                />
              </div>
            )}

            {participant.isMuted ? (
              <div
                className={cn(
                  "rounded-full bg-destructive/90 flex items-center justify-center",
                  size === "large"
                    ? "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    : "w-4 h-4 sm:w-5 sm:h-5"
                )}
              >
                <MicOff
                  className={cn(
                    size === "large"
                      ? "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5",
                    "text-white"
                  )}
                />
              </div>
            ) : (
              <div
                className={cn(
                  "rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center",
                  size === "large"
                    ? "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    : "w-4 h-4 sm:w-5 sm:h-5"
                )}
              >
                <Mic
                  className={cn(
                    size === "large"
                      ? "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5",
                    "text-white"
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
