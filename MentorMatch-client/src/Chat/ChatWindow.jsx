import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { toast, Toaster } from "../../src/hooks/use-toast";
import { useSendMessageMutation } from "@/redux/features/chat/chatApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getSocket } from "@/redux/features/chat/socket";

export const ChatWindow = ({ conversation, messages, onBack }) => {

  const currentUser = useAppSelector((state) => state.auth.user._id);
  const [sendMessage] = useSendMessageMutation();
  const socket = getSocket();

  useEffect(() => {
    if (!messages || !messages.length) return;
    // Mark messages as read if they are from other user and not read yet
    const unreadIds = messages
      .filter((m) => !m.isRead && m.sender._id !== currentUser)
      .map((m) => m._id);
    if (unreadIds.length > 0) {
      socket.emit("markAsRead", {
        conversationId: conversation.id || conversation._id,
      });
      // optional: emit message:seen with messageIds
      socket.emit("message:seen", {
        conversationId: conversation.id || conversation._id,
        messageIds: unreadIds,
        receiverId: currentUser,
      });
    }
  }, [messages, conversation, currentUser, socket]);



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
      <ChatHeader
        participant={conversation?.participant}
        onBack={onBack}
        conversationId={conversation?.id}
      />

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
