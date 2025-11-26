import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch,} from "react-redux";

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

  const { data: convData, isLoading: convLoading } = useGetConversationsQuery();

  // Determine selected conversation based on URL
  useEffect(() => {
    if (!convData?.data?.conversations) return;

    let conv = convData.data.conversations.find(
      (c) => c.id === urlConversationId
    );

    if (conv) {
      setSelectedConversation(conv);
      if (isMobile) setShowChat(true);
    } else if (urlConversationId) {
      setSelectedConversation({ _id: urlConversationId, participant: {} });
      if (isMobile) setShowChat(true);
    }
  }, [urlConversationId, convData, isMobile]);

  const conversationId = selectedConversation?.id;

  const {
    data: msgData,
    isLoading: messageLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(conversationId, { skip: !conversationId });

  //! Initialize socket + online status listeners
  useEffect(() => {
    if (!auth.user) return;
    const socket = connectSocket();
    const cleanup = initOnlineStatusListeners(dispatch);

    // Notify server that current user is online
    socket.emit("user-online", auth.user._id);

    return () => {
      if (cleanup) cleanup();
      socket.emit("user-offline", auth.user._id);
    };
  }, [auth.user, dispatch]);

  //! Auto-join conversation room
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !conversationId) return;
    socket.emit("joinRoom", conversationId);
  }, [conversationId]);

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    if (isMobile) setShowChat(true);
  };
  const handleBackToList = () => setShowChat(false);

  if (convLoading) return <div>Loading conversations...</div>;
  if (messageLoading) return <div>Loading messages...</div>;

  return (
    <div className="fixed top-20 left-0 right-0 flex items-center justify-center">
      <div className="w-11/12 h-[87vh] flex border rounded-lg shadow-lg bg-background overflow-hidden">
        {/* Conversation List */}
        {(!isMobile || !showChat) && (
          <ConversationList
            conversations={convData?.data?.conversations || []}
            selectedId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            loading={convLoading}
          />
        )}

        {/* Chat Window */}
        {(!isMobile || showChat) && selectedConversation && (
          <ChatWindow
            conversation={selectedConversation}
            messages={msgData?.data?.messages || []}
            onBack={isMobile ? handleBackToList : undefined}
            refetchMessages={refetchMessages}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
