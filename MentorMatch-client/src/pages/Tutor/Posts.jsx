import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, DollarSign, FileText, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button"

const Posts = () => {
    return (
        <Card>
            <CardContent>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    {/* Post 1 */}
                    <Card>
                        <CardContent className="">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2">Mastering Calculus: Tips for Success</h4>
                                    <p className="text-muted-foreground mb-3">
                                        Learn the fundamental concepts that will help you excel in calculus. From limits to derivatives,
                                        I'll share my proven strategies that have helped hundreds of students succeed.
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>2 days ago</span>
                                        <span>•</span>
                                        <span>5 min read</span>
                                        <span>•</span>
                                        <span>124 likes</span>
                                    </div>
                                </div>
                                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                                    <BookOpen className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Post 2 */}
                    <Card>
                        <CardContent className="">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2">Common Physics Mistakes and How to Avoid Them</h4>
                                    <p className="text-muted-foreground mb-3">
                                        Physics can be challenging, but many mistakes are easily avoidable once you know what to look for.
                                        Here are the top 10 mistakes I see students make and how to fix them.
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>1 week ago</span>
                                        <span>•</span>
                                        <span>8 min read</span>
                                        <span>•</span>
                                        <span>89 likes</span>
                                    </div>
                                </div>
                                <div className="w-16 h-16 bg-gradient-secondary rounded-lg flex items-center justify-center">
                                    <Star className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Post 3 */}
                    <Card>
                        <CardContent className="">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-2">Study Techniques That Actually Work</h4>
                                    <p className="text-muted-foreground mb-3">
                                        After 10 years of teaching, I've discovered which study techniques produce real results.
                                        These evidence-based methods will transform your learning experience.
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>2 weeks ago</span>
                                        <span>•</span>
                                        <span>6 min read</span>
                                        <span>•</span>
                                        <span>203 likes</span>
                                    </div>
                                </div>
                                <div className="w-16 h-16 bg-gradient-accent rounded-lg flex items-center justify-center">
                                    <FileText className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Button>see more</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Posts