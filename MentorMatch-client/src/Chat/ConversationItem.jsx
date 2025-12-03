import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";

export const ConversationItem = ({ conversation, isSelected, onClick }) => {

  const { participant, lastMessage, timestamp, unreadCount } = conversation;

  const onlineUsers = useAppSelector((s) => s.presence?.online || {});
  const userId = participant?.id || participant?._id;

  // Check online status
  const isOnline = !!onlineUsers[userId]?.isOnline;

  console.log(conversation);
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 sm:p-5 flex items-start flex-wrap gap-3  transition-all duration-200 text-left hover:bg-primary-foreground",
        isSelected &&
          " hover:bg-primary-foreground border-l-4 border-l-primary bg-primary/10"
      )}
    >
      <div className="relative ">
        <Avatar className="h-12 w-12 lg:h-14 lg:w-14 border-2 border-border/50">
          <AvatarImage src={participant.avatar} alt={participant.name} />
          <AvatarFallback className="text-lg font-semibold">
            {participant.name[0]}
          </AvatarFallback>
        </Avatar>

        {isOnline ? (
          <div className="absolute bottom-1 right-1 h-2 w-2  bg-green-500 rounded-full border-2  shadow-sm"></div>
        ) : (
          <div className="absolute bottom-1 right-1 h-2 w-2 bg-transparent rounded-full shadow-sm"></div>
        )}
      </div>

      <div className="flex-1 ">
        <div className="w-full flex items-start flex-wrap  justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 flex-1 ">
            <h3 className="font-semibold text-foreground truncate text-sm lg:text-base">
              {participant.name}
            </h3>
          </div>

          <span className="text-[9px] lg:text-xs text-muted-foreground truncate whitespace-nowrap">
            {formatDistanceToNow(timestamp, { addSuffix: true }).replace(
              "about ",
              ""
            )}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 ">
          <p className=" text-xs sm:text-sm text-muted-foreground  truncate line-clamp-1 max-w-[150px] sm:max-w-[200px]">
            {lastMessage || "No messages yet"}
          </p>

          {unreadCount > 0 && (
            <Badge className="bg-primary text-primary-foreground dark:text-black p-0 w-3 h-3  flex items-center justify-center rounded-full  text-[9px] font-bold shadow-sm">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};
