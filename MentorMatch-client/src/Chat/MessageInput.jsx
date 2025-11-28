import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TextareaAutosize from "react-textarea-autosize";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Send,
  Paperclip,
  Smile,
  Image as ImgIcon,
  FileText,
  X,
  ClipboardList,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { getSocket } from "@/redux/features/chat/socket";
import { useAppSelector } from "@/redux/hooks";
import { cn } from "@/lib/utils";

export const MessageInput = ({ onSendMessage, conversationId, mentorId }) => {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const fileInputRef = useRef(null);
  const currentUser = useAppSelector((state) => state.auth.user?._id);
  const handleSend = () => {
    if (!message.trim() && selectedFiles.length === 0) return;

    onSendMessage(message.trim(), selectedFiles, conversationId, mentorId);

    setMessage("");
    setSelectedFiles([]);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
    setEmojiOpen(false);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);

    const filesWithPreview = files.map((file) => {
      if (file.type.startsWith("image/")) {
        return Object.assign(file, { preview: URL.createObjectURL(file) });
      }
      return file;
    });

    setSelectedFiles((prev) => [...prev, ...filesWithPreview]);
    e.target.value = "";
  };

  const removeFile = (index) => {
    const file = selectedFiles[index];
    if (file.preview) URL.revokeObjectURL(file.preview);

    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  //handle typing indicator
  let typingTimeout = null;
  const socket = getSocket();

  const handleTyping = () => {
    if (!conversationId || !socket) return;

    socket.emit("typing", { conversationId, userId: currentUser });

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      socket.emit("stop-typing", { conversationId, userId: currentUser });
    }, 2000);
  };

  return (
    <div className="border-t border-border w-full p-4 bg-card shadow-sm mx-auto">
      {/* FILE PREVIEWS */}
      {selectedFiles.length > 0 && (
        <div className="mb-3 max-h-40 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3">
          {selectedFiles.map((file, i) => (
            <div
              key={i}
              className="relative p-2 rounded-lg border bg-secondary shadow-sm"
            >
              {/* IMAGE PREVIEW */}
              {file.type.startsWith("image/") ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-28 object-cover rounded-md"
                />
              ) : (
                /* FILE ICON PREVIEW */
                <div className="flex flex-col items-center justify-center h-28">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <p className="text-xs truncate mt-1">{file.name}</p>
                </div>
              )}

              {/* REMOVE BUTTON */}
              <button
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                onClick={() => removeFile(i)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex flex-col-reverse [@media(min-width:460px)]:flex-row  [@media(min-width:460px)]:items-end md:flex-wrap lg:flex-nowrap gap-2  ">
        <div className="flex items-center">
          <Button variant="outline">
            <ClipboardList className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">Custom order</span>
          </Button>

          {/* ATTACH FILE BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onPointerDown={openFileDialog}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          {/* EMOJI PICKER */}
          <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="p-0 border-0 shadow-none">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </PopoverContent>
          </Popover>
        </div>
        {/* HIDDEN FILE INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="w-full flex justify-between flex-end items-end gap-2 ">
          {/* MESSAGE INPUT */}
          {/*-- Textarea expands with content then it breaks need to works */}
          <div className="flex-1 min-w-0 ">
            <TextareaAutosize
              placeholder="Type a message..."
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              minRows={1}
              maxRows={5}
              onKeyPress={handleKeyPress}
              rows={1}
              className={cn(
                "flex w-full min-w-[130px] max-w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                "min-h-[44px]"
              )}
            />
          </div>

          {/* SEND BUTTON */}
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!message.trim() && selectedFiles.length === 0}
            className="h-11 w-11 bg-primary hover:bg-primary/90 shadow-md"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
