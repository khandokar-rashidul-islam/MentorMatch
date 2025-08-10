import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, MapPin, Clock, Users, BookOpen } from "lucide-react";
import { useNavigate } from 'react-router';
import MentorCard from './MentorCard';


const SearchMentor = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [displayedCount, setDisplayedCount] = useState(5);

    const TUTORS_PER_LOAD = 5;

    const allTutors = [
        {
            id: "sarah-johnson",
            name: "Dr. Sarah Johnson",
            title: "Mathematics & Physics Expert",
            avatar: "/src/assets/tutor-avatar.jpg",
            rating: 4.9,
            reviews: 127,
            hourlyRate: 45,
            location: "San Francisco, CA",
            subjects: ["Calculus", "Linear Algebra", "Physics"],
            experience: "10+ years",
            studentsCount: 500,
            responseTime: "1 hour",
            description: "PhD in Applied Mathematics from MIT. Specializes in making complex concepts accessible."
        },
        {
            id: "john-smith",
            name: "John Smith",
            title: "Full-Stack Developer & Instructor",
            avatar: "",
            rating: 4.8,
            reviews: 89,
            hourlyRate: 60,
            location: "Remote",
            subjects: ["JavaScript", "React", "Node.js"],
            experience: "8 years",
            studentsCount: 300,
            responseTime: "2 hours",
            description: "Senior developer at top tech companies. Expert in modern web development."
        },
        {
            id: "emma-wilson",
            name: "Emma Wilson",
            title: "English Language Specialist",
            avatar: "",
            rating: 4.7,
            reviews: 156,
            hourlyRate: 25,
            location: "New York, NY",
            subjects: ["English", "IELTS", "Writing"],
            experience: "6 years",
            studentsCount: 400,
            responseTime: "30 minutes",
            description: "Certified ESL instructor with experience in academic and business English."
        },
        {
            id: "alex-chen",
            name: "Alex Chen",
            title: "Digital Art & Design Mentor",
            avatar: "",
            rating: 4.9,
            reviews: 73,
            hourlyRate: 35,
            location: "Los Angeles, CA",
            subjects: ["Digital Art", "Photoshop", "UI Design"],
            experience: "7 years",
            studentsCount: 200,
            responseTime: "4 hours",
            description: "Professional digital artist and designer with portfolio in major studios."
        },
        {
            id: "michael-brown",
            name: "Michael Brown",
            title: "Data Science & Machine Learning Instructor",
            avatar: "/src/assets/tutor-avatar.jpg",
            rating: 4.8,
            reviews: 102,
            hourlyRate: 55,
            location: "Remote",
            subjects: ["Python", "Machine Learning", "Data Visualization"],
            experience: "9 years",
            studentsCount: 350,
            responseTime: "1 hour",
            description: "Former data scientist at Fortune 500 companies. Passionate about simplifying AI concepts."
        },
        {
            id: "linda-martinez",
            name: "Linda Martinez",
            title: "Biology & Chemistry Educator",
            avatar: "",
            rating: 4.7,
            reviews: 88,
            hourlyRate: 40,
            location: "Chicago, IL",
            subjects: ["Biology", "Organic Chemistry", "Genetics"],
            experience: "12 years",
            studentsCount: 450,
            responseTime: "2 hours",
            description: "MSc in Molecular Biology. Known for interactive, lab-focused learning methods."
        },
        {
            id: "ryan-harris",
            name: "Ryan Harris",
            title: "Cybersecurity & Networking Specialist",
            avatar: "",
            rating: 4.9,
            reviews: 64,
            hourlyRate: 65,
            location: "Austin, TX",
            subjects: ["Cybersecurity", "Networking", "Ethical Hacking"],
            experience: "10 years",
            studentsCount: 220,
            responseTime: "3 hours",
            description: "Certified Ethical Hacker (CEH) with experience in enterprise security solutions."
        },
        {
            id: "sophia-lee",
            name: "Sophia Lee",
            title: "Piano & Music Theory Instructor",
            avatar: "",
            rating: 4.8,
            reviews: 150,
            hourlyRate: 30,
            location: "Seattle, WA",
            subjects: ["Piano", "Music Theory", "Composition"],
            experience: "8 years",
            studentsCount: 500,
            responseTime: "45 minutes",
            description: "Professional pianist with a degree in Music Education. Teaches beginners to advanced players."
        },
        {
            id: "daniel-kim",
            name: "Daniel Kim",
            title: "Mobile App Development Coach",
            avatar: "",
            rating: 4.7,
            reviews: 79,
            hourlyRate: 50,
            location: "Remote",
            subjects: ["Flutter", "React Native", "Mobile UI/UX"],
            experience: "6 years",
            studentsCount: 180,
            responseTime: "1.5 hours",
            description: "Mobile developer with expertise in cross-platform solutions for startups and enterprises."
        }


    ];

    // Filter and search logic
    const filteredTutors = allTutors.filter((tutor) => {
        // Search by name, title, subjects, or description
        const searchMatch = searchQuery === "" ||
            tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tutor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
            tutor.description.toLowerCase().includes(searchQuery.toLowerCase());
        return searchMatch;
    });

    // Show tutors only if search has been performed or filters are applied
    const shouldShowTutors = searchQuery;
    const tutorsToShow = shouldShowTutors ? (filteredTutors.length > 5 ? filteredTutors.slice(0, displayedCount) : filteredTutors) : [];
    const loadMore = () => {
        setDisplayedCount(prev => prev + TUTORS_PER_LOAD);
    };
    return (
        <div className="min-h-screen bg-gradient-subtle">
            <main className="w-11/12 mx-auto px-4 py-8 mt-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4 text-center">Find Your Perfect Mentor</h1>
                    <p className="text-muted-foreground text-center">Connect with expert Mentors across various subjects and skill levels</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-card rounded-lg p-6 mb-8 shadow-elegant">
                    <div className="grid grid-cols-1  gap-4">
                        <div className="lg:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                            <Input
                                placeholder="Search tutors by name or subject..."
                                className="pl-10 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Results Count or Empty State */}
                {shouldShowTutors ? (
                    <>
                        <div className="mb-6">
                            <p className="text-muted-foreground">{filteredTutors.length} Mentors found</p>
                        </div>

                        {/* Tutors List */}
                        {tutorsToShow.length > 0 ? (
                            <div className="space-y-6">
                                {tutorsToShow.map((tutor) => (
                                    <MentorCard key={tutor.id} tutor={tutor} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Mentors found</h3>
                                <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                            </div>
                        )}

                        {/* Load More - only show if there are results */}
                        {filteredTutors.length > 5 && filteredTutors.length!=tutorsToShow.length && (
                            <div className="text-center mt-12">
                                <Button variant="outline" size="lg" onClick={loadMore}>Load More Tutors</Button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Empty State - Initial View */
                    <div className="text-center py-16">
                        <Search className="h-16 w-16 text-primary mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold mb-4">Find Your Perfect Mentor</h3>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Search for Mentors by subject, topic, or mentor name to discover expert instructors who match your learning needs.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                            <Badge variant="outline">Mathematics</Badge>
                            <Badge variant="outline">Programming</Badge>
                            <Badge variant="outline">Languages</Badge>
                            <Badge variant="outline">Science</Badge>
                            <Badge variant="outline">Arts</Badge>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default SearchMentor