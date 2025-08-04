import React from 'react'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Heart,
    Share2,
    Star,
    MapPin,
    Clock,
    CheckCircle,
    MessageCircle,
    MoreHorizontal,
} from "lucide-react";
import { Link } from 'react-router';




const Intro = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(247);

    const handleLike = () => {
        setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
        setIsLiked(!isLiked);
    };

    const subjects = [
        "Algebra",
        "Calculus",
        "Geometry",
        "Statistics",
        "Physics",
        "Trigonometry",
        "Linear Algebra",
        "Differential Equations",
    ];

    return (
        <Card className="overflow-hidden border-none shadow-none pb-0 ">
            <CardContent >
                {/* Header with avatar and basic info */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

                    <div className="relative mx-auto sm:mx-0">
                        <img
                            alt="Dr. Sarah Johnson"
                            className="w-24 h-24  rounded-full object-cover border-4 border-primary/20"
                        />
                        <div className="absolute right-1 bottom-5 bg-success rounded-full ">
                            <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </div>
                    </div>


                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <h1 className="text-xl sm:text-2xl font-bold text-foreground hover:text-primary"><Link to={`/tutor/details`}>Dr. Sarah Johnson</Link></h1>
                                <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-2">Mathematics & Physics Expert</p>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                                    <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <span className="text-sm sm:text-base">New York, NY</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Intro;
