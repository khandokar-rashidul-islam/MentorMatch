import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Toaster } from "@/hooks/use-toast";
import {
  useSendMessageMutation,
  useMarkAsReadMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
  chatApi,
} from "@/redux/features/chat/chatApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { getSocket } from "@/redux/features/chat/socket";

export const ChatWindow = ({ conversation, messages, onBack }) => {
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const conversationId = conversation.id || conversation._id;
  const socket = getSocket();
  const dispatch = useAppDispatch();
  const [sendMessage] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [editMessage] = useEditMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const [editingMessage, setEditingMessage] = useState(null);
  const [editingText, setEditingText] = useState("");

  /** --- 1. Realtime delivered & read events --- */
  useEffect(() => {
    if (!socket || !conversationId) return;

    const handleEdit = ({ conversationId: convId, message }) => {
      if (convId !== conversationId) return;

      // Update messages cache
      dispatch(
        chatApi.util.updateQueryData("getMessages", conversationId, (draft) => {
          draft.data.messages = draft.data.messages.map((m) =>
            m._id === message._id ? message : m
          );
        })
      );

      // Update last message in conversation
      dispatch(
        chatApi.util.updateQueryData("getConversations", undefined, (draft) => {
          draft.data = draft.data.map((conv) =>
            conv._id === convId
              ? {
                  ...conv,
                  lastMessage: message.text,
                  lastMessageAt: message.editedAt || message.createdAt,
                }
              : conv
          );
        })
      );
    };

    const handleDelete = ({ conversationId: convId, messageId }) => {
      if (convId !== conversationId) return;

      dispatch(
        chatApi.util.updateQueryData("getMessages", conversationId, (draft) => {
          draft.data.messages = draft.data.messages.map((m) =>
            m._id === messageId
              ? { ...m, text: "[deleted]", attachments: [], isDeleted: true }
              : m
          );
        })
      );

      // Update last message if deleted
      dispatch(
        chatApi.util.updateQueryData("getConversations", undefined, (draft) => {
          draft.data = draft.data.map((conv) => {
            if (conv._id !== convId) return conv;
            const lastMsg = conv.messages
              ?.slice()
              .reverse()
              .find((m) => !m.isDeleted);
            return {
              ...conv,
              lastMessage: lastMsg?.text || "[deleted]",
              lastMessageAt:
                lastMsg?.editedAt ||
                lastMsg?.createdAt ||
                new Date().toISOString(),
            };
          });
        })
      );
    };

    socket.on("message-edited", handleEdit);
    socket.on("message-deleted", handleDelete);

    return () => {
      socket.off("message-edited", handleEdit);
      socket.off("message-deleted", handleDelete);
    };
  }, [socket, conversationId, dispatch]);

  /** --- 2. Auto-mark delivered & read --- */
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

    const unread = messages.filter(
      (msg) => !msg.isRead && msg.sender._id !== currentUser
    );
    unread.forEach((msg) => {
      socket.emit("messages-read", { conversationId, readerId: currentUser });
      markAsRead({ conversationId, messageId: msg._id }).catch(console.error);
      chatApi.util.updateQueryData("getMessages", conversationId, (draft) => {
        const m = draft.data.messages.find((x) => x._id === msg._id);
        if (m) {
          m.isRead = true;
          m.readAt = new Date().toISOString();
        }
      });
    });
  }, [messages, conversationId, currentUser, socket, markAsRead]);

  /** --- 3. Send / Edit message --- */
  const handleSendMessage = (text, files) => {
    if (editingMessage) {
      editMessage({
        messageId: editingMessage._id,
        text,
        attachments: files,
        conversationId,
      });
      setEditingMessage(null);
      setEditingText("");
    } else {
      sendMessage({
        conversationId,
        mentorId: conversation?.participant?._id,
        text,
        files,
      }).catch(console.error);
    }
  };

  const handleEditClick = (message) => {
    if (message.isDeleted) return;
    setEditingMessage(message);
    setEditingText(message.text);
  };

  const handleDeleteClick = (messageId) => {
    deleteMessage({ messageId, conversationId }).catch(console.error);
  };

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
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>
      <MessageInput
        conversationId={conversation?.id}
        mentorId={conversation?.participant?._id}
        onSendMessage={handleSendMessage}
        editingMessage={editingMessage}
        editingText={editingText}
        setEditingText={setEditingText}
        cancelEdit={() => setEditingMessage(null)}
      />
      <Toaster />
    </div>
  );
};
