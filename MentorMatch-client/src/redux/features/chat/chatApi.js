import { baseApi } from "@/redux/api/baseApi";
import { getSocket } from "./socket";


// Utility to convert File[] → FormData for uploading attachments
const buildFormData = ({ conversationId, mentorId, text, files }) => {
  const formData = new FormData();

  const data = {
    conversationId,
    mentorId,
    text,
  };

  formData.append("data", JSON.stringify(data));

  if (files?.length) {
    files.forEach((file) => {
      formData.append("attachments", file);
    });
  }

  return formData;
};

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------------------------------------------------------------------- */
    /* GET MY CONVERSATIONS (Inbox)                                           */
    /* ---------------------------------------------------------------------- */
    getConversations: builder.query({
      query: () => "/chat/conversation",
      providesTags: ["Conversations"],
    }),

    /* ---------------------------------------------------------------------- */
    /* GET MESSAGES OF A CONVERSATION                                         */
    /* ---------------------------------------------------------------------- */
    getMessages: builder.query({
      query: (conversationId) => `/chat/message/${conversationId}`,
      providesTags: (r, e, conversationId) => [
        { type: "Messages", id: conversationId },
      ],

      async onCacheEntryAdded(
        conversationId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        await cacheDataLoaded;
        const socket = getSocket();
        if (!socket) return;

        // Join room
        socket.emit("joinRoom", conversationId);

        const handleNewMessage = (message) => {
          if (message.conversation.toString() === conversationId) {
            updateCachedData((draft) => {
              // Insert message at the end and ensure messages are sorted
              draft.data.messages.push(message);
              draft.data.messages.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              );
            });
          }
        };

        socket.on("new-message", handleNewMessage);
        await cacheEntryRemoved;
        socket.off("new-message", handleNewMessage);
      },
    }),

    /* ---------------------------------------------------------------------- */
    /* SEND MESSAGE (text + files)                                             */
    /* ---------------------------------------------------------------------- */
    sendMessage: builder.mutation({
      query: ({ conversationId, mentorId, text, files }) => ({
        url: "/chat/message/send",
        method: "POST",
        body: buildFormData({ conversationId, mentorId, text, files }),
      }),

      invalidatesTags: (r, e, { conversationId }) => [
        { type: "Messages", id: conversationId },
        "Conversations",
      ],
    }),

    /* ---------------------------------------------------------------------- */
    /* MARK MESSAGES AS READ                                                   */
    /* ---------------------------------------------------------------------- */
    markAsRead: builder.mutation({
      query: ({ conversationId }) => ({
        url: "/chat/message/read",
        method: "PATCH",
        body: { conversationId },
      }),

      async onQueryStarted({ conversationId }) {
        const socket = getSocket();
        if (socket) {
          socket.emit("markAsRead", { conversationId });
        }
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
} = chatApi;
