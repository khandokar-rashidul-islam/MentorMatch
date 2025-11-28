import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Toaster, toast } from "../../src/hooks/use-toast";
import {
  useSendMessageMutation,
  useMarkAsReadMutation,
  chatApi,
} from "@/redux/features/chat/chatApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getSocket } from "@/redux/features/chat/socket";

export const ChatWindow = ({ conversation, messages, onBack }) => {
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const [sendMessage] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const socket = getSocket();

  const conversationId = conversation.id || conversation._id;

  /** --- 1. Listen for delivered & read events --- */
  useEffect(() => {
    if (!socket) return;

    const handleDelivered = ({ messageIds }) => {
      // Optimistically update cache
      chatApi.util.updateQueryData("getMessages", conversationId, (draft) => {
        draft.data.messages.forEach((msg) => {
          if (messageIds.includes(msg._id)) msg.isDelivered = true;
        });
      });
    };

    const handleRead = ({ messageId }) => {
      chatApi.util.updateQueryData("getMessages", conversationId, (draft) => {
        draft.data.messages.forEach((msg) => {
          if (msg._id === messageId) {
            msg.isRead = true;
            msg.readAt = new Date().toISOString();
          }
        });
      });
    };

    socket.on("message:delivered", handleDelivered);
    socket.on("messages-read", handleRead);

    return () => {
      socket.off("message:delivered", handleDelivered);
      socket.off("messages-read", handleRead);
    };
  }, [socket, conversationId]);

  /** --- 2. Auto-mark messages as delivered when received --- */
  useEffect(() => {
    if (!socket || !messages?.length) return;

    const undelivered = messages
      .filter((m) => !m.isDelivered && m.sender._id !== currentUser)
      .map((m) => m._id);

    if (undelivered.length > 0) {
      socket.emit("message:delivered", {
        conversationId,
        messageIds: undelivered,
        receiverId: currentUser,
      });

      chatApi.util.updateQueryData("getMessages", conversationId, (draft) => {
        draft.data.messages.forEach((msg) => {
          if (undelivered.includes(msg._id)) msg.isDelivered = true;
        });
      });
    }
  }, [messages, conversationId, currentUser, socket]);

  /** --- 3. Auto-mark messages as read when they appear --- */
  useEffect(() => {
    if (!socket || !messages?.length) return;

    const unreadMessages = messages.filter(
      (msg) => !msg.isRead && msg.sender._id !== currentUser
    );

    unreadMessages.forEach((msg) => {
      // Emit socket event
      socket.emit("messages-read", { conversationId, readerId: currentUser });

      // Call backend API
      markAsRead({ conversationId, messageId: msg._id }).catch(console.error);

      // Optimistically update UI
      chatApi.util.updateQueryData("getMessages", conversationId, (draft) => {
        const messageToUpdate = draft.data.messages.find(
          (m) => m._id === msg._id
        );
        if (messageToUpdate) {
          messageToUpdate.isRead = true;
          messageToUpdate.readAt = new Date().toISOString();
        }
      });
    });
  }, [messages, conversationId, currentUser, socket, markAsRead]);

  /** --- 4. Send message --- */
  const handleSend = async (text, files, conversationId, mentorId) => {
    try {
      await sendMessage({ conversationId, mentorId, text, files }).unwrap();
    } catch (err) {
      console.error("Send message failed:", err);
      toast({
        title: "Send failed",
        description: "Message not sent",
        variant: "destructive",
      });
    }
  };

  const handleEditMessage = (messageId) =>
    toast({
      title: "Edit message",
      description: `Editing message ${messageId}`,
    });

  const handleDeleteMessage = (messageId) =>
    toast({
      title: "Delete message",
      description: `Deleting message ${messageId}`,
      variant: "destructive",
    });
console.log("messageData:", messages);
  return (
    <div className="flex flex-col h-full w-full bg-background">
      <ChatHeader
        participant={conversation?.participant}
        onBack={onBack}
        conversationId={conversation?.id}
      />

      <div className="w-full flex-1 min-h-0">
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
