import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useState } from "react";

import { ConversationList } from "../ConversationList";
import { ChatWindow } from "../ChatWindow";
import { useAppSelector } from "@/redux/hooks";
import { useGetConversationsQuery, useGetMessagesQuery } from "@/redux/features/chat/chatApi";
import { connectSocket, getSocket } from "../../redux/features/chat/socket";
import { useParams } from "react-router";



const Chat = () => {
  const isMobile = useIsMobile();
  const auth = useAppSelector((state) => state.auth);

  const { conversationId: urlConversationId } = useParams(); // detect from URL

  console.log("URL conversationId:", urlConversationId);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChat, setShowChat] = useState(false);

  // Fetch conversation list
  const { data: convData, isLoading: convLoading } = useGetConversationsQuery();

  // Find selected conversation based on URL
  useEffect(() => {
    if (!convData?.data?.conversations) return;

    let conv = convData.data.conversations.find(
      (c) => c.id === urlConversationId
    );

    if (conv) {
      setSelectedConversation(conv);
      if (isMobile) setShowChat(true);
    } else if (urlConversationId) {
      // If conversation not in list yet, create a minimal object to trigger message query
      setSelectedConversation({ _id: urlConversationId, participant: {} });
      if (isMobile) setShowChat(true);
    }

    
  }, [urlConversationId, convData, isMobile]);

  // Fetch messages for selected conversation
  const conversationId = selectedConversation?.id;
  console.log("Selected conversationId:", conversationId);

  const {
    data: msgData,
    isLoading: messageLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(conversationId, {
    skip: !conversationId,
  });

  //! need to work letter
  // Connect socket on mount
  useEffect(() => {
    if (auth?.accessToken) {
      connectSocket(auth.accessToken);
    }
  }, [auth?.accessToken]);

  // Auto-join room when conversation changes
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

  if (convLoading) {
    return <div>Loading conversations...</div>;
  }
  if (messageLoading) {
    return <div>Loading messages...</div>;
  }

  console.log("convData:", convData);
  console.log("msgData:", msgData);

  return (
    <div className="fixed top-20 left-0 right-0 flex items-center justify-center">
      <div className="w-11/12 h-[87vh] flex border rounded-lg shadow-lg bg-background overflow-hidden">
        {/* LEFT: Conversation list */}
        {(!isMobile || !showChat) && (
          <ConversationList
            conversations={convData?.data?.conversations || []}
            selectedId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            loading={convLoading}
          />
        )}

        {/* RIGHT: Chat window */}
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
