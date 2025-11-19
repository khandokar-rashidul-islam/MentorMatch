import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export const ConversationItem = ({ conversation, isSelected, onClick }) => {
  const { participant, lastMessage, timestamp, unreadCount } = conversation;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 sm:p-5 flex items-start gap-3  transition-all duration-200 text-left hover:bg-primary-foreground",
        isSelected &&
          " hover:bg-primary-foreground border-l-4 border-l-primary bg-primary/10"
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-border/50">
          <AvatarImage src={participant.avatar} alt={participant.name} />
          <AvatarFallback className="text-lg font-semibold">
            {participant.name[0]}
          </AvatarFallback>
        </Avatar>

        {participant.isOnline && (
          <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-chat-sidebar shadow-sm" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate text-sm sm:text-base">
              {participant.name}
            </h3>
          </div>

          <span className="text-[10px] sm:text-xs text-muted-foreground shrink-0 whitespace-nowrap">
            {formatDistanceToNow(timestamp, { addSuffix: true }).replace(
              "about ",
              ""
            )}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 ">
          <p
            className=" text-xs sm:text-sm text-muted-foreground  truncate line-clamp-1 max-w-[150px] sm:max-w-[200px]"
          >
            {lastMessage}
          </p>

          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center rounded-full px-1.5 text-xs font-semibold shadow-sm">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};
