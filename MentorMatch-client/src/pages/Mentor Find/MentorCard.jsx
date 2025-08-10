import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, MapPin, Clock, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router';

const MentorCard = ({tutor}) => {
    const navigate = useNavigate();
    return (
        <Card className="hover:shadow-elegant transition-all duration-300 p-0">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={tutor.avatar} />
                            <AvatarFallback className="text-lg">
                                {tutor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">{tutor.name}</h3>
                            <p className="text-muted-foreground mb-2">{tutor.title}</p>
                            <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-medium">{tutor.rating}</span>
                                    <span className="text-muted-foreground">({tutor.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{tutor.location}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">{tutor.description}</p>
                        </div>
                    </div>

                    <div className="lg:w-80">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center py-2  bg-muted rounded-lg">
                                <div className="text-sm font-semibold text-primary">${tutor.hourlyRate}</div>
                                <div className="text-xs text-muted-foreground">per hour</div>
                            </div>
                            <div className="text-center py-2 bg-muted rounded-lg">
                                <div className="text-sm font-semibold text-primary">{tutor.studentsCount}+</div>
                                <div className="text-xs text-muted-foreground">students</div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>Responds in {tutor.responseTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-primary" />
                                <span>{tutor.experience} experience</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                            {tutor.subjects.map((subject, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {subject}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <Button className="flex-1" onClick={() => navigate(`/tutor/details`)}>
                                View Profile
                            </Button>
                            <Button variant="outline">Message</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default MentorCard