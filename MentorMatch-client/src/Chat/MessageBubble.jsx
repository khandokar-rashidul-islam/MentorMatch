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
const isOnlyEmoji = (text) => {
  const trimmed = text.trim();

  // Matches *only emojis*, no letters, no numbers
  const emojiRegex = /^(?:\p{Extended_Pictographic}|\p{Emoji})+$/u;

  return emojiRegex.test(trimmed);
};

  console.log(message);

  console.log("message in bubble:", isOwnMessage);
  return (
    <div
      className={cn(
        "flex flex-col animate-in fade-in-0 slide-in-from-bottom-2 duration-300 group",
        isOwnMessage ? "items-end " : "items-start"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          isOwnMessage && "flex-row-reverse"
        )}
      >
        <div
          className={cn(
            "rounded-xl px-2 py-2 shadow ",
            isOwnMessage
              ? "bg-primary text-white rounded-br-none"
              : "bg-muted rounded-bl-none",
            (message.attachments?.length > 0 ||  isOnlyEmoji(message.text) )&& "bg-transparent "
          )}
        >
          {/* TEXT MESSAGE */}
          {message.text && (
            <p
              className={`whitespace-pre-line
              ${isOnlyEmoji(message.text) && "text-3xl"} 
                ${
                message.attachments?.length > 0
                  ? `bg-primary p-2 rounded-lg ${isOwnMessage?"rounded-br-none":"rounded-bl-none"}  `
                  : ""
              } `}
            >
              {message.text}
            </p>
          )}

          {/* ATTACHMENTS */}
          {message.attachments?.map((file, i) => (
            <div key={i} className="mt-2">
              {/* IMAGE ATTACHMENT */}
              {file.type === "image" ? (
                <a href={file.url} target="_blank">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="rounded-lg max-w-xs max-h-60 border"
                  />
                </a>
              ) : (
                /* FILE ATTACHMENT */
                <a
                  href={file.url}
                  target="_blank"
                  className="flex items-center gap-3 p-2 bg-white/70 border rounded-lg text-black"
                >
                  {/* File Icon */}
                  <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                    📄
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </a>
              )}
            </div>
          ))}
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
            {format(new Date(message.createdAt), "HH:mm")}
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
