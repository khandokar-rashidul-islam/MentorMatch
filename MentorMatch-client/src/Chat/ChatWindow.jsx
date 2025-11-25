import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { toast, Toaster } from "../../src/hooks/use-toast";
import { useSendMessageMutation } from "@/redux/features/chat/chatApi";
import { useAppSelector } from "@/redux/hooks";

export const ChatWindow = ({ conversation, messages, onBack }) => {

  const currentUser = useAppSelector((state) => state.auth.user._id);

  const [sendMessage] = useSendMessageMutation();

 const handleSend = async (text, files, conversationId, mentorId) => {
   try {
     await sendMessage({
       conversationId,
       mentorId,
       text,
       files,
     }).unwrap();
   } catch (err) {
     console.error("Send message failed:", err);
   }
 };

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
    <div className="flex flex-col h-full w-full bg-background">
      <ChatHeader participant={conversation?.participant} onBack={onBack} />

      <div className="flex-1 min-h-0">
        <MessageList
          messages={messages}
          currentUserId={currentUser}
          onEditMessage={handleEditMessage}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>

      <MessageInput
        conversationId={conversation?.id}
        mentorId={conversation?.participant?._id}
        onSendMessage={handleSend}
      />

      <Toaster />
    </div>
  );
};
