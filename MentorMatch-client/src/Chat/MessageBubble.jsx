import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const MessageBubble = ({
  message,
  isOwnMessage,
  showTimestamp,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col animate-in fade-in-0 slide-in-from-bottom-2 duration-300 group",
        isOwnMessage ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "flex items-start gap-2",
          isOwnMessage && "flex-row-reverse"
        )}
      >
        <div
          className={cn(
            "max-w-[85%] sm:max-w-[75%] lg:max-w-[60%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 break-words shadow-sm",
            isOwnMessage
              ? "bg-chat-sent text-chat-sent-foreground rounded-br-md"
              : "bg-chat-received text-chat-received-foreground rounded-bl-md border border-border"
          )}
        >
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align={isOwnMessage ? "end" : "start"}>
            <DropdownMenuItem
              onClick={() => onEdit && onEdit(message.id)}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete && onDelete(message.id)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showTimestamp && (
        <div
          className={cn(
            "flex items-center gap-1 mt-1.5 text-[10px] sm:text-xs text-muted-foreground",
            isOwnMessage && "flex-row-reverse"
          )}
        >
          <span className="font-medium">
            {format(message.timestamp, "HH:mm")}
          </span>

          {isOwnMessage && (
            <span
              className={cn(
                message.isRead ? "text-primary" : "text-muted-foreground"
              )}
            >
              {message.isRead ? (
                <CheckCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              ) : (
                <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
