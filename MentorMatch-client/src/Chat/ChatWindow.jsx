import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { toast, Toaster } from "../../src/hooks/use-toast";

export const ChatWindow = ({
  conversation,
  messages,
  onSendMessage,
  onBack,
}) => {

  const handleEditMessage = (messageId) => {
    toast({
      title: "Edit message",
      description: `Editing message ${messageId}`,
    });
  };

  const handleDeleteMessage = (messageId) => {
    toast({
      title: "Delete message",
      description: `Deleting message ${messageId}`,
      variant: "destructive",
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full w-full">
      <ChatHeader participant={conversation.participant} onBack={onBack} />

      <MessageList
        messages={messages}
        currentUserId="me"
        onEditMessage={handleEditMessage}
        onDeleteMessage={handleDeleteMessage}
      />

      <MessageInput onSendMessage={onSendMessage} />
        <Toaster />
    </div>
  );
};
