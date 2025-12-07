import { useState, useRef, useEffect } from "react";
import { X, Send, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function ChatPanel({ messages, onSendMessage, onClose }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-full sm:w-72 md:w-80 h-full flex flex-col bg-card border-l border-border animate-slide-in-right absolute sm:relative right-0 top-0 z-20">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm sm:text-base">
          In-call messages
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8 sm:py-12">
            <p className="font-medium">No messages yet</p>
            <p className="mt-1 text-xs opacity-70">
              Messages are only visible to call participants
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "animate-fade-in",
                message.senderId === "1" && "flex flex-col items-end"
              )}
            >
              {message.senderId !== "1" && (
                <span className="text-xs font-medium text-muted-foreground mb-1 sm:mb-1.5">
                  {message.senderName}
                </span>
              )}

              <div
                className={cn(
                  "px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl max-w-[90%] sm:max-w-[85%] text-sm",
                  message.senderId === "1"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}
              >
                {message.content}
              </div>

              <span className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 sm:mt-1.5 opacity-70">
                {formatTime(message.timestamp)}
              </span>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 sm:p-4 border-t border-border">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              className="pr-10 rounded-full bg-muted border-0 focus-visible:ring-1 text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <Smile className="w-4 h-4" />
            </button>
          </div>

          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            size="icon"
            className="rounded-full shrink-0 w-9 h-9 sm:w-10 sm:h-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
