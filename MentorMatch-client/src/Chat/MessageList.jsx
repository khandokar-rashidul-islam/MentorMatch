import { MessageBubble } from "./MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

export const MessageList = ({ messages, currentUserId, onEdit, onDelete }) => {
  const scrollRef = useRef(null);

  // AUTO SCROLL TO BOTTOM WHEN MESSAGES CHANGE
  useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight; // always scroll to bottom
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full w-full  px-4 py-4" ref={scrollRef}>
      <div className="w-full space-y-3 pb-4">
        {messages.map((msg) => {
          const isOwn = (msg.sender?._id || msg.senderId) === currentUserId;

          // const showTimestamp =
          //   index === 0 ||
          //   msg.sender._id !== messages[index - 1].sender._id ||
          //   new Date(msg.createdAt) - new Date(messages[index - 1].createdAt) > 1 * 60 * 1000;

          return (
            <MessageBubble
              key={msg._id}
              message={msg}
              isOwnMessage={isOwn}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};
