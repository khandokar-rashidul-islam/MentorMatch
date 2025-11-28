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
    //* -------------------------------------------------------------------------- */
    //* start conversation                                                     */
    //* -------------------------------------------------------------------------- */

    startConversation: builder.mutation({
      query: ({ mentorId, text }) => ({
        url: "/chat/conversation/start",
        method: "POST",
        body: { mentorId, text },
      }),

      invalidatesTags: ["Conversations"],
    }),

    /* ---------------------------------------------------------------------- */
    /* GET MY CONVERSATIONS (Inbox)                                           */
    /* ---------------------------------------------------------------------- */
    getConversations: builder.query({
      query: (role) => `/chat/conversation?role=${role}`,
      providesTags: ["Conversations"],
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
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

        // join room
        socket.emit("joinRoom", conversationId);

        // NEW MESSAGE handler (existing)
        const handleNewMessage = (message) => {
          if (message.conversation.toString() === conversationId) {
            updateCachedData((draft) => {
              draft.data.messages.push(message);
              draft.data.messages.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              );
            });
          }
        };

        // Typing handlers -> update global typing slice via socket-global listeners or we can also reflect in cache meta
        const handleTyping = (payload) => {
          // payload: { conversationId, userId }
          if (payload.conversationId === conversationId) {
            // no change to messages cache, typing handled globally by typing slice
            // (we already hook typing in initOnlineStatusListeners)
          }
        };
        const handleStopTyping = (payload) => {
          if (payload.conversationId === conversationId) {
            // handled by typing slice
          }
        };

        // Messages read / message seen (update messages in cache)
        const handleMessagesRead = ({ conversationId: convId, userId }) => {
          if (convId !== conversationId) return;
          updateCachedData((draft) => {
            draft.data.messages = draft.data.messages.map((m) => {
              // mark messages from the other user as isRead = true
              if (
                m.sender._id &&
                m.sender._id.toString() !== userId &&
                !m.isRead
              ) {
                return { ...m, isRead: true };
              }
              return m;
            });
          });
        };

        // Message seen event (server may send messageIds or message object)
        const handleMessageSeen = (payload) => {
          // payload could be { messageIds: [], conversationId, userId }
          if (
            payload.conversationId &&
            payload.conversationId !== conversationId
          )
            return;
          const messageIds =
            payload.messageIds || (payload._id ? [payload._id] : []);
          if (!messageIds || messageIds.length === 0) return;

          updateCachedData((draft) => {
            draft.data.messages = draft.data.messages.map((m) =>
              messageIds.includes(m._id)
                ? { ...m, seen: true, isRead: true }
                : m
            );
          });
        };

        socket.on("new-message", handleNewMessage);
        socket.on("typing", handleTyping);
        socket.on("stop-typing", handleStopTyping);
        socket.on("messages-read", handleMessagesRead); // when someone marks messages as read
        socket.on("message:seen", handleMessageSeen); // when server confirms seen by receiver

        await cacheEntryRemoved;
        socket.off("new-message", handleNewMessage);
        socket.off("typing", handleTyping);
        socket.off("stop-typing", handleStopTyping);
        socket.off("messages-read", handleMessagesRead);
        socket.off("message:seen", handleMessageSeen);
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
      query: ({ conversationId, messageId }) => ({
        url: "/chat/messages/read",
        method: "PATCH",
        body: { conversationId, messageId },
      }),

      async onQueryStarted(
        { conversationId, messageId },
        { dispatch, queryFulfilled }
      ) {
        const socket = getSocket();
        if (socket && messageId) {
          // Emit socket event to notify other participants
          socket.emit("messages-read", {
            conversationId,
            messageId,
          });
        }

        try {
          const { data } = await queryFulfilled;

          // Optimistically update cache for this conversation
          dispatch(
            chatApi.util.updateQueryData(
              "getMessages",
              conversationId,
              (draft) => {
                draft.data.messages = draft.data.messages.map((m) =>
                  m._id === messageId
                    ? { ...m, isRead: true, readAt: data.data.readAt }
                    : m
                );
              }
            )
          );
        } catch (err) {
          console.error("Mark as read failed", err);
        }
      },
    }),
  }),
});

export const {
  useStartConversationMutation,
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
} = chatApi;
