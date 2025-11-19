import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Send, Paperclip, Smile, Image, FileText, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() || selectedFiles.length > 0) {
      onSendMessage(message);
      setMessage("");
      setSelectedFiles([]);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setEmojiOpen(false);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
    setAttachmentOpen(false);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border p-3 sm:p-4 bg-card shadow-sm shrink-0">
      <div className="max-w-4xl mx-auto">
        {selectedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 text-sm"
              >
                {file.type.startsWith("image/") ? (
                  <Image className="h-4 w-4" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                <span className="max-w-[150px] truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 hover:bg-destructive/10"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
            
         {/* create custome oreder  */}
         <div>
           <Button variant="outline" className=" ">Custom order</Button>
         </div>

          <div className="hidden sm:flex gap-2">
            <Popover open={attachmentOpen} onOpenChange={setAttachmentOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-48 p-2" side="top">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Images
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 border-0" side="top">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Mobile attachment */}
          <div className="sm:hidden">
            <Popover open={attachmentOpen} onOpenChange={setAttachmentOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-48 p-2" side="top">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="justify-start text-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Images
                  </Button>

                  <Button
                    variant="ghost"
                    className="justify-start text-sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Textarea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[40px] sm:min-h-[44px] max-h-32 resize-none text-sm sm:text-base"
            rows={1}
          />

          <Button
            onClick={handleSend}
            disabled={!message.trim() && selectedFiles.length === 0}
            size="icon"
            className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 shadow-md bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
