import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Heart, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";

const LearnerProfile = () => {
   const navigate = useNavigate();
  const [reviews, setReviews] = useState([
    {
      id: 1,
      mentor: "John Doe",
      rating: 5,
      text: "Very attentive and eager to learn!",
      replies: [{ id: 1, text: "Thank you!", user: "Learner" }],
      showReplies: false
    },
    {
      id: 2,
      mentor: "Jane Smith",
      rating: 4,
      text: "Shows great progress in coding.",
      replies: [],
      showReplies: false
    },
  ]);


  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [replyText, setReplyText] = useState({});

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Learner Name",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "2h ago",
      title: "My React Project",
      content: "Just finished my first React project and learned so much!",
      likes: 4,
      liked: false,
      comments: [
        { id: 1, user: "John Doe", text: "Great job!" },
        { id: 2, user: "Jane Smith", text: "Looks amazing!" },
      ],
      showComments: false,
    },
    {
      id: 2,
      user: "Learner Name",
      avatar: "https://i.pravatar.cc/150?img=12",
      time: "1d ago",
      title: "CSS Tips",
      content: "Here are my top 5 CSS tricks for cleaner design.",
      likes: 2,
      liked: false,
      comments: [],
      showComments: false,
    },
  ]);

  const [commentText, setCommentText] = useState({});

  const toggleLike = (id) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleComments = (id) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, showComments: !p.showComments } : p
      )
    );
  };

  // const addComment = (id) => {
  //   if (!commentText.trim()) return;
  //   setPosts(
  //     posts.map((p) =>
  //       p.id === id
  //         ? {
  //           ...p,
  //           comments: [
  //             ...p.comments,
  //             { id: Date.now(), user: "You", text: commentText },
  //           ],
  //         }
  //         : p
  //     )
  //   );
  //   setCommentText("");
  // };

  const addComment = (id) => {
    if (!commentText[id]?.trim()) return;

    setPosts(posts.map(p =>
      p.id === id
        ? { ...p, comments: [...p.comments, { id: Date.now(), user: "You", text: commentText[id] }] }
        : p
    ));

    setCommentText({ ...commentText, [id]: "" });
  };
  const handleReviewSubmit = () => {
    if (!newReview.trim() || rating === 0) return;
    setReviews([
      ...reviews,
      {
        id: Date.now(),
        mentor: "Current Mentor",
        rating,
        text: newReview,
        replies: [],
      },
    ]);
    setNewReview("");
    setRating(0);
  };

  const handleReply = (reviewId) => {
    if (!replyText[reviewId]?.trim()) return;

    setReviews(
      reviews.map((rev) =>
        rev.id === reviewId
          ? {
            ...rev,
            replies: [
              ...rev.replies,
              { id: Date.now(), text: replyText[reviewId], user: "Learner" },
            ],
          }
          : rev
      )
    );

    // Clear only this review's reply input
    setReplyText({ ...replyText, [reviewId]: "" });
  };
  const toggleReplies = (id) => {
    setReviews(reviews.map(r =>
      r.id === id ? { ...r, showReplies: !r.showReplies } : r
    ));
  };

  return (
    <div className='w-11/12 mx-auto pt-24'>
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6"
        >
          <Avatar className="w-24 h-24 border-4 border-purple-500">
            <AvatarImage src="https://i.pravatar.cc/150?img=12" />
            <AvatarFallback>LS</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex flex-col md:items-start text-center md:text-left">
            <div className="w-full flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">Learner Name</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  MERN Stack Enthusiast | Passionate Problem Solver
                </p>
              </div>
              <Button variant="default" className="ml-4 hidden md:block"  onClick={() => navigate(`/dashboard/learner/edit-profile`)}>
                Edit
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              <span className="bg-purple-100 text-purple-800 px-3  rounded-full text-sm flex items-center justify-center">
                React
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 flex items-center justify-center  rounded-full text-sm">
                Tailwind CSS
              </span>
              <span className="bg-green-100 text-green-800 px-3 flex items-center justify-center rounded-full text-sm">
                MongoDB
              </span>

            </div>
            <Button variant="default" className="mt-4 md:hidden"  onClick={() => navigate(`/dashboard/learner/edit-profile`)}> edit</Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>
                  Hello! I'm a dedicated learner with a focus on full-stack web
                  development. I enjoy creating clean, user-friendly applications
                  and continuously improving my skills.
                </p>
                <ul className="list-disc list-inside">
                  <li>🎯 Solved 200+ coding problems</li>
                  <li>🏆 Completed MERN Stack Bootcamp</li>
                  <li>💡 Strong problem-solving and teamwork skills</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Reviews List */}
                {reviews.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex items-center gap-2 mb-1 space-x-2">
                      <strong>{r.mentor}</strong>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < r.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mb-2">{r.text}</p>

                    {/* Toggle Replies Button */}
                    {r.replies.length > 0 && (
                      <button
                        onClick={() => toggleReplies(r.id)}
                        className="text-sm text-blue-500 hover:underline mb-2"
                      >
                        {r.showReplies ? "Hide Replies" : `View Replies (${r.replies.length})`}
                      </button>
                    )}

                    {/* Replies */}
                    <AnimatePresence>
                      {r.showReplies && r.replies.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 mt-2 space-y-1 border-l-2 border-purple-400 pl-3"
                        >
                          {r.replies.map((reply) => (
                            <p
                              key={reply.id}
                              className="text-sm text-gray-600 dark:text-gray-300"
                            >
                              <strong>{reply.user}:</strong> {reply.text}
                            </p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Show Reply Button */}
                    <button
                      onClick={() =>
                        setReviews(reviews.map(item =>
                          item.id === r.id
                            ? { ...item, showReplyInput: !item.showReplyInput }
                            : item
                        ))
                      }
                      className="text-xs text-gray-500 hover:text-purple-500 ml-2 mt-2"
                    >
                      {r.showReplyInput ? "Cancel" : "Reply"}
                    </button>


                    {/* Reply Input (Hidden Initially) */}
                    {r.showReplyInput && (
                      <div className="flex mt-2 gap-2">
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyText[r.id] || ""} // use r.id as key
                          onChange={(e) =>
                            setReplyText({
                              ...replyText,
                              [r.id]: e.target.value
                            })
                          }
                          className="h-8"
                        />
                        <Button onClick={() => handleReply(r.id)} variant="secondary">
                          Reply
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Add Review */}
                <div className="border-t pt-4">
                  <p className="font-semibold mb-1">Add Review</p>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        onClick={() => setRating(i + 1)}
                        className={`w-6 h-6 cursor-pointer ${i < rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <Textarea
                    placeholder="Write your review..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                  />
                  <Button className="mt-2 w-full" onClick={handleReviewSubmit}>
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Learner's Posts */}
        <div>
          <h2 className="text-xl font-bold mb-4">Posts</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback>LN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.user}</p>
                      <p className="text-sm text-gray-500">{post.time}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {post.content}
                    </p>

                    {/* Like & Comment Buttons */}
                    <div className="flex items-center gap-4 mb-2">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition"
                      >
                        <Heart
                          className={`w-5 h-5 ${post.liked
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400"
                            }`}
                        />
                        {post.likes}
                      </button>
                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition"
                      >
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                        {post.comments.length}
                      </button>
                    </div>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {post.showComments && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2 mt-3"
                        >
                          {post.comments.length > 0 ? (
                            post.comments.map((c) => (
                              <div
                                key={c.id}
                                className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg"
                              >
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback>{c.user[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-semibold">{c.user}</p>
                                  <p className="text-sm">{c.text}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">No comments yet.</p>
                          )}

                          {/* Add Comment */}
                          <div className="mt-2 flex gap-2">
                            <Textarea
                              placeholder="Write a comment..."
                              value={commentText[post.id] || ""}
                              onChange={(e) =>
                                setCommentText({
                                  ...commentText,
                                  [post.id]: e.target.value
                                })
                              }
                              className="min-h-[40px]"
                            />
                            <Button onClick={() => addComment(post.id)}>Post</Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnerProfile