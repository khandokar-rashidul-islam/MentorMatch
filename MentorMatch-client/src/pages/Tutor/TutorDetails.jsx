import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import TutorProfile from "./TutorProfile";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";
import BookingPlans from "./BookingPlans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, DollarSign, FileText, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TutorDetails = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Find Tutors", href: "/tutors" },
    { label: "Mathematics", href: "/tutors/mathematics" },
    { label: "Dr. Sarah Johnson" }
  ];

  return (
    <div className="min-h-screen mt-20 bg-gradient-subtle">
      <main className="w-11/12 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4 sm:mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <TutorProfile />

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  About
                </TabsTrigger>
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  All Posts
                </TabsTrigger>
                <TabsTrigger value="gigs" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  All Gigs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-4">
                <div className="space-y-4 sm:space-y-6">
                  {/* About Me */}
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">About Me</h3>
                      <p className="text-muted-foreground mb-4">
                        I'm Dr. Sarah Johnson, a passionate mathematics educator with over 10 years of experience 
                        helping students excel in mathematics and physics. I hold a Ph.D. in Applied Mathematics 
                        from MIT and have taught at both high school and university levels.
                      </p>
                      <p className="text-muted-foreground mb-4">
                        My teaching philosophy centers on making complex concepts accessible and engaging. I believe 
                        every student can succeed in mathematics with the right approach and personalized guidance. 
                        I specialize in breaking down difficult problems into manageable steps and building confidence 
                        through practice and understanding.
                      </p>
                      <p className="text-muted-foreground">
                        When I'm not teaching, I enjoy researching mathematical applications in real-world scenarios 
                        and developing innovative teaching methods. I've published several papers on mathematics 
                        education and have been recognized for my contributions to STEM education.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Services & Specializations */}
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Services & Specializations</h3>
                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Academic Support</h4>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• Homework assistance</li>
                            <li>• Test preparation</li>
                            <li>• Concept clarification</li>
                            <li>• Study strategies</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Exam Preparation</h4>
                          <ul className="space-y-2 text-muted-foreground">
                            <li>• SAT/ACT Math sections</li>
                            <li>• AP Calculus & Physics</li>
                            <li>• GRE Quantitative</li>
                            <li>• College entrance exams</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Education & Credentials */}
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Education & Credentials</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium">Ph.D. in Applied Mathematics</h4>
                            <p className="text-muted-foreground">Massachusetts Institute of Technology (MIT)</p>
                            <p className="text-sm text-muted-foreground">2010 - 2014</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium">M.S. in Mathematics</h4>
                            <p className="text-muted-foreground">Stanford University</p>
                            <p className="text-sm text-muted-foreground">2008 - 2010</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium">B.S. in Mathematics & Physics</h4>
                            <p className="text-muted-foreground">University of California, Berkeley</p>
                            <p className="text-sm text-muted-foreground">2004 - 2008</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Teaching Experience */}
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Teaching Experience</h3>
                      <div className="space-y-4">
                        <div className="border-l-2 border-primary pl-4">
                          <h4 className="font-medium">Senior Mathematics Tutor</h4>
                          <p className="text-muted-foreground">Online Platform • 2020 - Present</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Providing personalized tutoring to 500+ students with 98% success rate
                          </p>
                        </div>
                        <div className="border-l-2 border-muted pl-4">
                          <h4 className="font-medium">Associate Professor</h4>
                          <p className="text-muted-foreground">University of California, Los Angeles • 2016 - 2020</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Taught advanced calculus and linear algebra courses
                          </p>
                        </div>
                        <div className="border-l-2 border-muted pl-4">
                          <h4 className="font-medium">High School Math Teacher</h4>
                          <p className="text-muted-foreground">Beverly Hills High School • 2014 - 2016</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Taught AP Calculus and Honors Mathematics
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="posts" className="mt-4">
                <div className="space-y-4">
                  {/* Post 1 */}
                  <Card>
                    <CardContent className="p-4 sm:p-6">
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
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Post 2 */}
                  <Card>
                    <CardContent className="p-4 sm:p-6">
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
                          <Star className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Post 3 */}
                  <Card>
                    <CardContent className="p-4 sm:p-6">
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
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="gigs" className="mt-4">
                <div className="space-y-4">
                  {/* Gig 1 */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 h-32 bg-gradient-primary flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-white" />
                        </div>
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
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 h-32 bg-gradient-secondary flex items-center justify-center">
                          <Star className="h-12 w-12 text-white" />
                        </div>
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
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 h-32 bg-gradient-accent flex items-center justify-center">
                          <FileText className="h-12 w-12 text-white" />
                        </div>
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
                </div>
              </TabsContent>
            </Tabs>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Services & Specializations</h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Academic Support</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Homework assistance</li>
                      <li>• Test preparation</li>
                      <li>• Concept clarification</li>
                      <li>• Study strategies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Exam Preparation</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• SAT/ACT Math sections</li>
                      <li>• AP Calculus & Physics</li>
                      <li>• GRE Quantitative</li>
                      <li>• College entrance exams</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ReviewSection />
            
            <FAQSection />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <BookingPlans />

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold mb-3 sm:mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Students:</span>
                    <span className="font-medium">500+</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Years Teaching:</span>
                    <span className="font-medium">10+</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-medium">2 hours</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate:</span>
                    <span className="font-medium text-success">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold mb-3 sm:mb-4">Availability</h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday", time: "9:00 AM - 6:00 PM" },
                    { day: "Tuesday", time: "9:00 AM - 6:00 PM" },
                    { day: "Wednesday", time: "9:00 AM - 6:00 PM" },
                    { day: "Thursday", time: "9:00 AM - 6:00 PM" },
                    { day: "Friday", time: "9:00 AM - 4:00 PM" },
                    { day: "Weekend", time: "By appointment" },
                  ].map(({ day, time }) => (
                    <div className="flex justify-between items-center" key={day}>
                      <span className="text-muted-foreground">{day}</span>
                      <span className="text-sm">{time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>


    </div>
  );
};

export default TutorDetails;
