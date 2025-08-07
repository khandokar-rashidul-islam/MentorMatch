import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, DollarSign, FileText, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"


const Gigs = () => {
    return (
        <Card>
            <CardContent>
                <div className="space-y-4 ">
                    {/* Gig 1 */}
                    <Card >
                        <CardContent className="">
                            <div className="flex flex-col sm:flex-row">
                                <div className="flex-1 p-4 sm:p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold">Advanced Calculus Tutoring</h4>
                                        <Badge variant="secondary">Best Seller</Badge>
                                    </div>
                                    <p className="text-muted-foreground mb-3 text-sm">
                                        Master calculus concepts with personalized one-on-one sessions. Perfect for college students.
                                    </p>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">4.9</span>
                                            <span className="text-sm text-muted-foreground">(127)</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>1 hour sessions</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4 text-primary" />
                                            <span className="font-semibold">$45/hour</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">Active</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gig 2 */}
                    <Card >
                        <CardContent className="">
                            <div className="flex flex-col sm:flex-row">
                                <div className="flex-1 p-4 sm:p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold">SAT Math Prep Intensive</h4>
                                        <Badge variant="outline">Popular</Badge>
                                    </div>
                                    <p className="text-muted-foreground mb-3 text-sm">
                                        Comprehensive SAT math preparation with proven strategies to boost your score by 100+ points.
                                    </p>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">4.8</span>
                                            <span className="text-sm text-muted-foreground">(89)</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>2 hour sessions</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4 text-primary" />
                                            <span className="font-semibold">$65/session</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">Active</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gig 3 */}
                    <Card >
                        <CardContent className="">
                            <div className="flex flex-col sm:flex-row">

                                <div className="flex-1 p-4 sm:p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold">Physics Problem Solving</h4>
                                        <Badge variant="secondary">New</Badge>
                                    </div>
                                    <p className="text-muted-foreground mb-3 text-sm">
                                        Learn to tackle complex physics problems with confidence using systematic approaches.
                                    </p>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">5.0</span>
                                            <span className="text-sm text-muted-foreground">(23)</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>90 min sessions</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4 text-primary" />
                                            <span className="font-semibold">$55/session</span>
                                        </div>
                                        <span className="text-sm text-muted-foreground">Active</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-center items-center">
                        <Button>see more</Button>
                    </div>

                </div>

            </CardContent>
        </Card>
    )
}

export default Gigs