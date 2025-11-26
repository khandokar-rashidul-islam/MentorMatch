import { ConversationItem } from "./ConversationItem";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ConversationList = ({
  conversations,
  selectedId,
  onSelectConversation,
  loading,
}) => {

  console.log("ConversationList conversations:", conversations);
  return (
    <div className="w-full md:w-80 lg:w-96 bg-chat-sidebar border-r border-border flex flex-col h-full">
      <div className="p-4 sm:p-6 border-b border-border shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
          Messages
        </h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 bg-background h-10" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {loading && <p className="p-4 text-center text-muted">Loading...</p>}

          {!loading && conversations.length === 0 && (
            <p className="p-4 text-center text-muted">No conversations</p>
          )}

          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={conversation.id === selectedId}
              onClick={() => onSelectConversation(conversation)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
