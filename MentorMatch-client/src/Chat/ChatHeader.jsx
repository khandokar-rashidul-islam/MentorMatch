import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreVertical,
  ArrowLeft,
  MessageSquareX,
  Trash2,
  Ban,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import { formatLastSeen } from "@/lib/formatLastSeen";

export const ChatHeader = ({ participant, onBack, conversationId }) => {
  const onlineUsers = useAppSelector((s) => s.presence?.online || {});
  const lastSeen = useAppSelector((s) => s.presence?.lastSeen || {});
  const typing = useAppSelector((state) => state.typing.typing);

  const userId = participant?.id || participant?._id;

  const isTyping = typing?.[conversationId]?.[userId] || false;

  // Check online status
  const isOnline = !!onlineUsers[userId]?.isOnline;

  // Determine the text to show (need to work letter on this)
  const statusText = isTyping
    ? "Typing..."
    : isOnline
    ? "Active now"
    : lastSeen[userId]
    ? formatLastSeen(lastSeen[userId])
    : "Offline";

  return (
    <div className="h-14 sm:h-16 border-b border-border px-3 sm:px-6 w-full flex flex-wrap  items-center  justify-between bg-card shadow-sm ">
      <div className="w-full flex  items-center gap-2 sm:gap-3 flex-1 min-w-0">
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
              {participant.name}
            </AvatarFallback>
          </Avatar>

          {/* Green dot shows only if online */}
          {isOnline && (
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 rounded-full border-2 border-card shadow-sm" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-foreground text-sm sm:text-base truncate">
              {participant.name}
            </h2>
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            {statusText}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => console.log("Clear chat")}>
              <MessageSquareX className="h-4 w-4 mr-2" /> Clear chat
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete conversation")}
            >
              <Trash2 className="h-4 w-4 mr-2 text-destructive" />
              <span className="text-destructive">Delete conversation</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Block user")}>
              <Ban className="h-4 w-4 mr-2" /> Block user
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Report user")}>
              <Flag className="h-4 w-4 mr-2" /> Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
