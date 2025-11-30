import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const MessageBubble = ({ message, isOwnMessage, onEdit, onDelete }) => {
  const isOnlyEmoji = (text) => {
    if (!text) return false;
    const emojiRegex = /^(?:\p{Extended_Pictographic}|\p{Emoji})+$/u;
    return emojiRegex.test(text.trim());
  };

  return (
    <div
      className={cn(
        "flex flex-col w-full animate-in fade-in-0 slide-in-from-bottom-2 duration-300 group",
        isOwnMessage ? "items-end" : "items-start"
      )}
    >
      <div className="flex flex-col w-full gap-2">
        <div
          className={cn(
            "flex items-center w-full gap-2",
            isOwnMessage && "flex-row-reverse"
          )}
        >
          {/* MESSAGE BUBBLE */}
          <div
            className={cn(
              "rounded-xl px-2 py-2 shadow max-w-[200px] sm:max-w-[320px] lg:max-w-[320px] xl:max-w-[500px] wrap-break-word",

              // normal bubble colors
              !message.attachments?.length &&
                !isOnlyEmoji(message.text) &&
                (isOwnMessage
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-muted rounded-bl-none"),

              // attachments or emoji → transparent bubble
              (message.attachments?.length > 0 || isOnlyEmoji(message.text)) &&
                "bg-transparent"
            )}
          >
            {/* DELETED MESSAGE */}
            {message.isDeleted ? (
              <p className="italic text-gray-400">This message was deleted</p>
            ) : (
              <>
                {/* TEXT */}
                {message.text && (
                  <p
                    className={cn(
                      "whitespace-pre-line",
                      isOnlyEmoji(message.text) && "text-3xl",
                      message.attachments?.length > 0 &&
                        (isOwnMessage
                          ? "bg-primary p-2 rounded-lg rounded-br-none"
                          : "bg-muted p-2 rounded-lg rounded-bl-none")
                    )}
                  >
                    {message.text}

                    {/* EDITED LABEL */}
                    {message.editedAt && (
                      <span className="text-[10px] text-gray-300 ml-1">
                        (edited)
                      </span>
                    )}
                  </p>
                )}

                {/* ATTACHMENTS */}
                {message.attachments?.map((file, i) => (
                  <div key={i} className="mt-2">
                    {file.type === "image" ? (
                      <a href={file.url} target="_blank">
                        <img
                          src={file.url}
                          alt={file.name}
                          className="rounded-lg max-w-xs max-h-60 border"
                        />
                      </a>
                    ) : (
                      <a
                        href={file.url}
                        target="_blank"
                        className="flex items-center gap-3 p-2 bg-white/70 border rounded-lg text-black"
                      >
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
              </>
            )}
          </div>

          {/* OPTIONS MENU → SHOW ONLY IF NOT DELETED */}
          {!message.isDeleted && isOwnMessage && (
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
                  onClick={() => onEdit(message)}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onDelete(message._id)}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* TIME + STATUS */}
        <div
          className={cn(
            "flex items-center gap-1 mt-1.5 text-[10px] sm:text-xs",
            isOwnMessage && "flex-row-reverse"
          )}
        >
          <small>
            {format(
              toZonedTime(new Date(message.createdAt), "Asia/Dhaka"),
              "hh:mm a"
            )}
          </small>

          {/* READ / DELIVERED */}
          {isOwnMessage && !message.isDeleted && (
            <span>
              {message.isRead ? (
                <CheckCheck className="h-3 w-3 text-blue-500" />
              ) : message.isDelivered ? (
                <Check className="h-3 w-3 text-gray-400" />
              ) : null}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
