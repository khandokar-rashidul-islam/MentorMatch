import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

export const MessageList = ({ messages, currentUserId, onEditMessage, onDeleteMessage }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full px-3 sm:px-6 py-4 sm:py-6" ref={scrollRef}>
      <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
        {messages.map((message, index) => {
          const isOwnMessage = message.senderId === currentUserId;

          const showTimestamp =
            index === 0 ||
            messages[index - 1].senderId !== message.senderId ||
            new Date(message.timestamp).getTime() -
              new Date(messages[index - 1].timestamp).getTime() >
              1000 * 60 * 5;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={isOwnMessage}
              showTimestamp={showTimestamp}
              onEdit={onEditMessage}
              onDelete={onDeleteMessage}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};
