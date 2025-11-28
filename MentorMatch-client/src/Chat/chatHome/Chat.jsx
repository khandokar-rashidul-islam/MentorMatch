import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import { ConversationList } from "../ConversationList";
import { ChatWindow } from "../ChatWindow";

import { connectSocket, getSocket } from "@/redux/features/chat/socket";

import { useAppSelector } from "@/redux/hooks";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "@/redux/features/chat/chatApi";
import { initOnlineStatusListeners } from "@/redux/features/chat/initOnlineStatusListeners";

const Chat = () => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { conversationId: urlConversationId } = useParams();

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Fetch conversations
  const { data: convData, isLoading: convLoading } = useGetConversationsQuery();

  /**
   * Select conversation based on URL param
   */
  useEffect(() => {
    if (!convData?.conversations) return;

    const found = convData.conversations.find(
      (c) => c.id === urlConversationId
    );

    if (found) {
      setSelectedConversation(found);
      if (isMobile) setShowChat(true);
    } else if (urlConversationId) {
      // URL has an id but data not yet loaded
      setSelectedConversation({ id: urlConversationId, participant: {} });
      if (isMobile) setShowChat(true);
    }
  }, [urlConversationId, convData, isMobile]);

  const conversationId = selectedConversation?.id;

  /**
   * Fetch messages of selected conversation
   */
  const {
    data: msgData,
    isLoading: messageLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(conversationId, {
    skip: !conversationId,
  });

  /**
   * Initialize socket + presence listener
   */
  useEffect(() => {
    if (!auth.user?._id) return;

    const socket = connectSocket();
    const cleanup = initOnlineStatusListeners(dispatch);

    try {
      const s = getSocket();
      if (s?.connected) {
        s.emit("presence:request");
      }
    } catch (err) {
      console.warn("presence request error:", err);
    }

    return () => {
      cleanup?.();
      socket.emit("user-offline", auth.user._id);
    };
  }, [auth.user?._id, dispatch]);

  /**
   * Join socket room when conversation changes
   */
  useEffect(() => {
    const socket = getSocket();
    if (socket && conversationId) {
      socket.emit("joinRoom", conversationId);
    }
  }, [conversationId]);

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    if (isMobile) setShowChat(true);
  };

  const handleBackToList = () => setShowChat(false);

  if (convLoading) return <div>Loading conversations...</div>;
  if (conversationId && messageLoading) return <div>Loading messages...</div>;

  console.log("messageData:", msgData?.data.messages);

  return (
    <div className="fixed top-20 left-0 right-0 flex items-center justify-center">
      <div className="w-11/12 h-[87vh] flex border rounded-lg shadow-lg bg-background overflow-hidden">
        {/* Conversation List */}
        {(!isMobile || !showChat) && (
          <ConversationList
            conversations={convData?.conversations || []}
            selectedId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            loading={convLoading}
          />
        )}

        {/* Chat Window */}
        {(!isMobile || showChat) && selectedConversation && (
          <ChatWindow
            conversation={selectedConversation}
            messages={msgData?.data?.messages ?? []}
            onBack={isMobile ? handleBackToList : undefined}
            refetchMessages={refetchMessages}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
