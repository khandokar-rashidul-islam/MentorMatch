import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Video, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChatHeader = ({ participant, onBack }) => {
  return (
    <div className="h-14 sm:h-16 border-b border-border px-3 sm:px-6 flex items-center justify-between bg-card shadow-sm shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-9 w-9 shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <div className="relative shrink-0">
          <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border-2 border-border/50">
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback className="text-sm font-semibold">
              {participant.name[0]}
            </AvatarFallback>
          </Avatar>

          {participant.isOnline && (
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 rounded-full border-2 border-card shadow-sm" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-foreground text-sm sm:text-base truncate">
              {participant.name}
            </h2>

            <Badge
              variant="secondary"
              className="text-[10px] sm:text-xs capitalize px-1.5 py-0 shrink-0"
            >
              {participant.role}
            </Badge>
          </div>

          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {participant.isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9 hidden sm:flex"
        >
          <Phone className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
          <Video className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
