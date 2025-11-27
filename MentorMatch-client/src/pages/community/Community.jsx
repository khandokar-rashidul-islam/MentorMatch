import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  TrendingUp,
  MessageSquare,
  Heart,
  Share,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router";

const posts = [
  {
    id: 1,
    author: "Dr. Sarah Johnson",
    avatar: "/src/assets/tutor-avatar.jpg",
    role: "Mentor",
    time: "2 hours ago",
    title: "5 Common Calculus Mistakes and How to Avoid Them",
    content:
      "After teaching calculus for over 10 years, I've noticed students repeatedly make these same mistakes. Here's how to overcome them...",
    likes: 156,
    comments: 23,
    shares: 12,
    tags: ["Mathematics", "Calculus", "Tips"],
    isLiked: false,
  },
  {
    id: 2,
    author: "John Smith",
    avatar: "",
    role: "Learner",
    time: "4 hours ago",
    title: "My Journey from Zero to Full-Stack Developer",
    content:
      "Six months ago, I couldn't write a single line of code. Today, I built my first full-stack application! Here's what I learned...",
    likes: 234,
    comments: 45,
    shares: 18,
    tags: ["Programming", "Web Development", "Journey"],
    isLiked: true,
  },
  {
    id: 3,
    author: "Emma Wilson",
    avatar: "",
    role: "Mentor",
    time: "6 hours ago",
    title: "Best Study Techniques for Language Learning",
    content:
      "Language learning doesn't have to be overwhelming. These proven techniques will help you master any language more efficiently...",
    likes: 89,
    comments: 17,
    shares: 8,
    tags: ["Languages", "Study Tips", "Learning"],
    isLiked: false,
  },
];

const trendingTopics = [
  { name: "Mathematics", posts: 1234 },
  { name: "Programming", posts: 987 },
  { name: "Language Learning", posts: 756 },
  { name: "Study Tips", posts: 543 },
  { name: "Science", posts: 432 },
];
const Community = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-25 w-11/12 mx-auto">
      <main className="">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Community</h1>
                <p className="text-muted-foreground">
                  Connect, share, and learn together
                </p>
              </div>
              <Button
                onClick={() => navigate("")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Post
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, topics, or users..."
                className="pl-10"
              />
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {/* Create Post Quick */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 w-full">
                        <Textarea
                          placeholder="Share your knowledge, ask questions, or start a discussion..."
                          className="min-h-[80px] w-full resize-none"
                        />
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="cursor-pointer">
                              Mathematics
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer">
                              Programming
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer">
                              Languages
                            </Badge>
                          </div>
                          <Button>Post</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts Feed */}
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="hover:shadow-elegant transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center flex-wrap gap-2 mb-2">
                            <span className="font-semibold">{post.author}</span>
                            <Badge
                              variant={
                                post.role === "Mentor" ? "default" : "secondary"
                              }
                              className={`text-xs ${
                                post.role != "Mentor" && "text-primary" 
                              } `}
                            >
                              {post.role}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {post.time}
                            </span>
                          </div>

                          <h3
                            className="text-lg font-semibold mb-2 cursor-pointer hover:text-primary"
                            onClick={() => navigate(``)}
                          >
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground mb-4">
                            {post.content}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <button
                              className={`flex items-center gap-1 hover:text-primary transition-colors ${
                                post.isLiked ? "text-red-500" : ""
                              }`}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  post.isLiked ? "fill-current" : ""
                                }`}
                              />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                              <Share className="h-4 w-4" />
                              <span>{post.shares}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Follow people to see their posts
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start following tutors and learners to see their updates
                      here
                    </p>
                    <Button>Find People to Follow</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                {posts
                  .filter((post) => post.likes > 150)
                  .map((post) => (
                    <Card
                      key={post.id}
                      className="hover:shadow-elegant transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-1 text-orange-500">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs font-medium">
                              Trending
                            </span>
                          </div>
                        </div>
                        {/* Same post content as above */}
                        <div className="flex items-start gap-4 mt-2">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={post.avatar} />
                            <AvatarFallback>
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="font-semibold">
                                {post.author}
                              </span>
                              <Badge
                                variant={
                                  post.role === "Tutor"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {post.role}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {post.time}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-primary">
                              {post.title}
                            </h3>

                            <p className="text-muted-foreground mb-4">
                              {post.content}
                            </p>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                {post.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {post.comments}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 max-lg:hidden">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{topic.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {topic.posts} posts
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">12,543</div>
                    <div className="text-sm text-muted-foreground">
                      Active Members
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">3,847</div>
                    <div className="text-sm text-muted-foreground">
                      Posts This Week
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">856</div>
                    <div className="text-sm text-muted-foreground">
                      Active Tutors
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/dashboard/learner/search-mentor")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Find Mentor
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/dashboard/learner/all-gigs")}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Gigs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
