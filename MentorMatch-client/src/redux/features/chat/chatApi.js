import { baseApi } from "../../api/baseApi";
import { getSocket } from "../../socket/socket";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get conversations
    getConversations: builder.query({
      query: () => "/chat/conversations",
      providesTags: ["Conversations"],
    }),

    // Get messages + real-time sync
    getMessages: builder.query({
      query: (conversationId) => `/chat/messages/${conversationId}`,

      providesTags: (result, error, conversationId) => [
        { type: "Messages", id: conversationId },
      ],

      async onCacheEntryAdded(
        conversationId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        await cacheDataLoaded;

        const socket = getSocket();
        if (!socket) return;

        socket.emit("joinRoom", conversationId);

        const listener = (message) => {
          if (message.conversation === conversationId) {
            updateCachedData((draft) => {
              draft.data.push(message);
            });
          }
        };

        socket.on("newMessage", listener);

        await cacheEntryRemoved;
        socket.off("newMessage", listener);
      },
    }),

    // Send message
    sendMessage: builder.mutation({
      query: ({ conversationId, text, attachments }) => ({
        url: "/chat/messages/send",
        method: "POST",
        body: { conversationId, text, attachments },
      }),

      invalidatesTags: (result, error, { conversationId }) => [
        { type: "Messages", id: conversationId },
      ],

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const socket = getSocket();
          if (socket) {
            socket.emit("sendMessage", data.data);
          }
        } catch (err) {
          console.log("Message send failed", err);
        }
      },
    }),

    // Mark as read
    markAsRead: builder.mutation({
      query: (conversationId) => ({
        url: `/chat/messages/read/${conversationId}`,
        method: "PATCH",
      }),

      async onQueryStarted(conversationId) {
        const socket = getSocket();
        if (socket) {
          socket.emit("markAsRead", { conversationId });
        }
      },
    }),

    // Upload file
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: `/chat/messages/upload`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useUploadFileMutation,
} = chatApi;
