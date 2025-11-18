import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { ConversationList } from "../ConversationList";
import { ChatWindow } from "../ChatWindow";


// Mock data for demonstration
const mockConversations = [
  {
    id: "1",
    participant: {
      id: "u1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      role: "mentor",
      isOnline: true,
    },
    lastMessage: "Great! Let me know if you need any help with the assignment.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 0,
  },
  {
    id: "2",
    participant: {
      id: "u2",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      role: "learner",
      isOnline: true,
    },
    lastMessage: "Thank you for the session today!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2,
  },
  {
    id: "3",
    participant: {
      id: "u3",
      name: "Emma Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      role: "mentor",
      isOnline: false,
    },
    lastMessage: "I'll send you the materials by tomorrow.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 0,
  },
  {
    id: "4",
    participant: {
      id: "u4",
      name: "James Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      role: "learner",
      isOnline: false,
    },
    lastMessage: "When is our next session?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unreadCount: 1,
  },
];

const mockMessages = {
  1: [
    {
      id: "m1",
      senderId: "u1",
      content: "Hi! How can I help you with your math homework today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isRead: true,
    },
    {
      id: "m2",
      senderId: "me",
      content:
        "I'm struggling with quadratic equations. Can you explain the formula?",
      timestamp: new Date(Date.now() - 1000 * 60 * 18),
      isRead: true,
    },
    {
      id: "m3",
      senderId: "u1",
      content:
        "Of course! The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a. Let me break it down for you.",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isRead: true,
    },
    {
      id: "m4",
      senderId: "me",
      content: "That makes more sense now. Can we work through an example?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      isRead: true,
    },
    {
      id: "m5",
      senderId: "u1",
      content: "Great! Let me know if you need any help with the assignment.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: true,
    },
  ],
  2: [
    {
      id: "m6",
      senderId: "u2",
      content: "Hello! I wanted to thank you for today's tutoring session.",
      timestamp: new Date(Date.now() - 1000 * 60 * 40),
      isRead: true,
    },
    {
      id: "m7",
      senderId: "me",
      content:
        "You're very welcome! I'm glad I could help. How did the practice problems go?",
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      isRead: true,
    },
    {
      id: "m8",
      senderId: "u2",
      content: "Thank you for the session today!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false,
    },
  ],
};

const Chat = () => {
  const isMobile = useIsMobile();
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[0]
  );
  const [messages, setMessages] = useState(mockMessages["1"]);
  const [showChat, setShowChat] = useState(false);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setMessages(mockMessages[conversation.id] || []);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      id: `m${Date.now()}`,
      senderId: "me",
      content,
      timestamp: new Date(),
      isRead: false,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex w-11/12 mx-auto px-4 mt-20 border  rounded-lg shadow-lg">
      {(!isMobile || !showChat) && (
        <ConversationList
          conversations={mockConversations}
          selectedId={selectedConversation.id}
          onSelectConversation={handleSelectConversation}
        />
      )}
      {(!isMobile || showChat) && (
        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
          onSendMessage={handleSendMessage}
          onBack={isMobile ? handleBackToList : undefined}
        />
      )}
    </div>
  );
};

export default Chat;
