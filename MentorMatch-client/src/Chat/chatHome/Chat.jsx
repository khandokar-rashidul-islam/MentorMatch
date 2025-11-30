// chat main outlet
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";
import { useParams } from "react-router";


import { ConversationList } from "../ConversationList";
import { ChatWindow } from "../ChatWindow";

import { connectSocket, getSocket } from "@/redux/features/chat/socket";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
} from "@/redux/features/chat/chatApi";
import { initOnlineStatusListeners } from "@/redux/features/chat/initOnlineStatusListeners";

const Chat = () => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const activeRole = auth?.user?.activeRole;
  const { conversationId: urlConversationId } = useParams();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Fetch conversations based on role (fixes cache issue)
  const {
    data: convData,
    isLoading: convLoading,
    refetch: refetchConversations,
  } = useGetConversationsQuery(activeRole, {
    skip: !activeRole,
  });
  //  When role changes, force refetch
  useEffect(() => {
    if (activeRole) {
      refetchConversations();
    }
  }, [activeRole, refetchConversations]);

  // Select conversation based on URL param

  useEffect(() => {
    if (!convData?.data?.conversations) return;

    let conv = convData.data.conversations.find(
      (c) => c.id === urlConversationId
    );

    if (conv) {
      setSelectedConversation(conv);
      if (isMobile) setShowChat(true);
    } else if (urlConversationId) {
      setSelectedConversation({ id: urlConversationId, participant: {} });
      if (isMobile) setShowChat(true);
    }
  }, [urlConversationId, convData, isMobile]);

  const conversationId = selectedConversation?.id;

  // Fetch messages of selected conversation
  const {
    data: msgData,
    isLoading: messageLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(conversationId, {
    skip: !conversationId,
  });

  // Initialize socket + presence listener
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

  // Join socket room when conversation changes

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
    <div className="w-full  pt-25 mb-4 flex items-center justify-center my-auto">
      <div className="w-11/12 h-[79vh] grid md:grid-cols-12  border rounded-lg shadow-lg bg-background ">
        {/* Conversation List */}
        {(!isMobile || !showChat) && (
          <div className="w-full h-[79vh] md:col-span-4">
            <ConversationList
              conversations={convData?.data?.conversations || []}
              selectedId={selectedConversation?.id}
              onSelectConversation={handleSelectConversation}
              loading={convLoading}
            />
          </div>
        )}

        {/* Chat Window */}
        {(!isMobile || showChat) && selectedConversation && (
          <div className="w-full h-[79vh] md:col-span-8">
            <ChatWindow
              conversation={selectedConversation}
              messages={msgData?.data?.messages ?? []}
              onBack={isMobile ? handleBackToList : undefined}
              refetchMessages={refetchMessages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
