import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Star, Users, Clock, Award, BookOpen, Target, Trophy } from "lucide-react";
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import TutorProfile from '../Tutor/TutorProfile';
import BookingPlans from '../Tutor/BookingPlans';
import ReviewSection from '../Tutor/ReviewSection';
import FAQSection from '../Tutor/FAQSection';
import GigStats from './GigStats';
import GigHeader from './GigHeader';
import CommentSection from './CommentSection';
import { Link } from 'react-router';
import Intro from './Intro';

const GigDetails = () => {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Find Tutors", href: "/tutors" },
        { label: "Mathematics", href: "/tutors/mathematics" },
        { label: "Dr. Sarah Johnson" }
    ];

    const services = [
        {
            icon: BookOpen,
            title: "Academic Support",
            items: ["Homework assistance", "Concept clarification", "Study strategies", "Progress tracking"]
        },
        {
            icon: Target,
            title: "Test Preparation",
            items: ["SAT/ACT Math sections", "AP Calculus & Physics", "GRE Quantitative", "College entrance exams"]
        },
        {
            icon: Trophy,
            title: "Specialized Programs",
            items: ["Competition math prep", "Advanced placement", "Remedial support", "Accelerated learning"]
        }
    ];

    const subjects = [
        "Algebra", "Geometry", "Trigonometry", "Pre-Calculus", "Calculus AB/BC",
        "Statistics", "Discrete Math", "Linear Algebra", "Differential Equations"
    ];
    return (
        <div className="min-h-screen bg-gradient-subtle">

            <main className="w-11/12 mx-auto px-4 md:px-6 lg:px-8 py-6 pt-30">
                {/* Breadcrumbs */}
                <div className="mb-6">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                {/* Gig Header */}
                <div className="mb-8">
                    <GigHeader />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        {/* <GigGallery /> */}

                        {/* About This Gig */}
                        <Card>
                            <CardHeader>
                                <CardTitle>About This Mathematics Tutoring Service</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-muted-foreground leading-relaxed">
                                        Are you struggling with mathematics? Looking to improve your grades or prepare for important exams?
                                        I'm here to help you master mathematical concepts with personalized, one-on-one tutoring sessions
                                        tailored to your specific needs and learning style.
                                    </p>

                                    <p className="text-muted-foreground leading-relaxed">
                                        With over 10 years of teaching experience and a PhD in Mathematics from MIT, I've helped thousands
                                        of students achieve their academic goals. My approach combines clear explanations, practical examples,
                                        and proven study techniques to make even the most complex topics understandable.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-3">What You'll Get:</h4>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {[
                                            "Personalized lesson plans",
                                            "Interactive problem-solving sessions",
                                            "Comprehensive study materials",
                                            "Progress tracking & feedback",
                                            "Flexible scheduling options",
                                            "24/7 message support",
                                            "Exam preparation strategies",
                                            "Homework help & guidance"
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                                                <span className="text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Subjects Covered */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Subjects & Topics Covered</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {subjects.map((subject, index) => (
                                        <Badge key={index} variant="outline" className="text-sm">
                                            {subject}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tutor Profile */}

                        {/* Booking Plans */}
                        <div className='mt-8'>
                            <BookingPlans />
                        </div>

                        {/* Reviews Section */}
                        <ReviewSection />

                        {/* FAQ Section */}
                        <FAQSection />

                        {/* Comments Section */}
                        <CommentSection />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Gig Stats */}
                        <GigStats />

                        {/* Quick Contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Tutor</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary mb-1">Starting at $40</div>
                                    <div className="text-sm text-muted-foreground">per session</div>
                                </div>

                                <Separator />

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Delivery Time:</span>
                                        <span className="font-medium">Same day</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Revisions:</span>
                                        <span className="font-medium">Unlimited</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Queue:</span>
                                        <Badge variant="outline" className="text-success border-success text-xs">
                                            2 spots available
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Related Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {["Mathematics", "Physics", "Chemistry", "Statistics", "Data Analysis", "Programming"].map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default GigDetails