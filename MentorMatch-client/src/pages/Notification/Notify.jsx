import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check, Clock, MessageSquare, Star, Calendar, Award, X } from "lucide-react";

const Notify = () => {
    const notifications = [
    {
      id: 1,
      type: "booking",
      title: "New session booked",
      message: "John Doe has booked a calculus session for tomorrow at 2:00 PM",
      time: "5 minutes ago",
      read: false,
      avatar: "",
      icon: Calendar
    },
    {
      id: 2,
      type: "message",
      title: "New message",
      message: "Dr. Sarah Johnson: 'Looking forward to our session tomorrow!'",
      time: "1 hour ago",
      read: false,
      avatar: "/src/assets/tutor-avatar.jpg",
      icon: MessageSquare
    },
    {
      id: 3,
      type: "review",
      title: "New review received",
      message: "Emma Wilson left you a 5-star review: 'Excellent teaching!'",
      time: "3 hours ago",
      read: true,
      avatar: "",
      icon: Star
    },
    {
      id: 4,
      type: "achievement",
      title: "Achievement unlocked",
      message: "You've earned the 'Top Rated Tutor' badge!",
      time: "1 day ago",
      read: true,
      avatar: "",
      icon: Award
    },
    {
      id: 5,
      type: "reminder",
      title: "Session reminder",
      message: "You have a JavaScript session with Alex Chen in 30 minutes",
      time: "2 days ago",
      read: true,
      avatar: "",
      icon: Clock
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColor = (type) => {
    switch (type) {
      case "booking": return "text-blue-600 bg-blue-100";
      case "message": return "text-green-600 bg-green-100";
      case "review": return "text-yellow-600 bg-yellow-100";
      case "achievement": return "text-purple-600 bg-purple-100";
      case "reminder": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle ">

      <main className="px-4 py-8">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex flex-wrap items-center gap-3">
              <Bell className="h-8 w-8" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">Stay updated with your latest activities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6 w-full  ">
          <TabsList className="w-full flex flex-wrap h-full">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
                  <p className="text-muted-foreground">You're all caught up! New notifications will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card key={notification.id} className={`transition-all duration-200 hover:shadow-md ${!notification.read ? 'border-primary border-l-4 bg-primary/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.avatar} />
                            <AvatarFallback>
                              {notification.title.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                            <notification.icon className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2 ml-4">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              Mark as read
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive">
                            <X className="h-3 w-3" />delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.read).map((notification) => (
              <Card key={notification.id} className="border-primary border-l-4 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>
                            {notification.title.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                          <notification.icon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground ml-4">{notification.time}</span>
                      </div>
                      <p className="text-sm">{notification.message}</p>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Mark as read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            {notifications.filter(n => n.type === 'booking').map((notification) => (
              <Card key={notification.id} className={!notification.read ? 'border-primary border-l-4 bg-primary/5' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                      <notification.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            {notifications.filter(n => n.type === 'message').map((notification) => (
              <Card key={notification.id} className={!notification.read ? 'border-primary border-l-4 bg-primary/5' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.avatar} />
                      <AvatarFallback>
                        {notification.title.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {notifications.filter(n => n.type === 'review').map((notification) => (
              <Card key={notification.id} className={!notification.read ? 'border-primary border-l-4 bg-primary/5' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                      <notification.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

    </div>
  )
}

export default Notify