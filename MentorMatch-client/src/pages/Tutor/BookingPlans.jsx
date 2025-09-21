import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar, Users, CheckCircle, Star } from "lucide-react";
import { useGetActiveProfileQuery } from '../../redux/features/user/userApi';

const BookingPlans = ({data}) => {
  // const instantSessions = [
  //   {
  //     id: 1,
  //     title: "Quick Help Session",
  //     duration: "30 minutes",
  //     price: 40,
  //     description: "Perfect for quick questions and homework help",
  //     availability: "Available now"
  //   },
  //   {
  //     id: 2,
  //     title: "Standard Session",
  //     duration: "60 minutes",
  //     price: 80,
  //     description: "Comprehensive lesson covering specific topics",
  //     availability: "Available now"
  //   }
  // ];
  /* 
    const weeklyPlans = [
      {
        id: 1,
        title: "Weekly Basics",
        sessions: "1 session/week",
        duration: "4 weeks",
        price: 300,
        originalPrice: 320,
        savings: 20,
        features: ["1-on-1 sessions", "Homework support", "Progress tracking"]
      },
      {
        id: 2,
        title: "Weekly Intensive",
        sessions: "2 sessions/week",
        duration: "4 weeks",
        price: 580,
        originalPrice: 640,
        savings: 60,
        popular: true,
        features: ["1-on-1 sessions", "Homework support", "Progress tracking", "Custom materials"]
      }
    ];
  
    const monthlyPlans = [
      {
        id: 1,
        title: "Monthly Standard",
        sessions: "4 sessions/month",
        price: 280,
        originalPrice: 320,
        savings: 40,
        features: ["Flexible scheduling", "Progress reports", "Email support"]
      },
      {
        id: 2,
        title: "Monthly Premium",
        sessions: "8 sessions/month",
        price: 520,
        originalPrice: 640,
        savings: 120,
        popular: true,
        features: ["Priority scheduling", "Detailed progress reports", "24/7 chat support", "Custom study plan"]
      },
      {
        id: 3,
        title: "Monthly Elite",
        sessions: "12 sessions/month",
        price: 720,
        originalPrice: 960,
        savings: 240,
        features: ["VIP scheduling", "Weekly progress calls", "Direct tutor contact", "Exam preparation"]
      }
    ]; */
/*   const { data } = useGetActiveProfileQuery(null, {
    refetchOnMountOrArgChange: true,
  }); */
  const profile = data?.data?.user?.profile;

  //console.log(profile)

  const instant = profile?.plans.instant
 // console.log(instant)
  const weekly_basic = profile?.plans.weekly.basic
  const weekly_intensive = profile?.plans.weekly.intensive

  const monthly_standard = profile?.plans.monthly.standard
  const monthly_elite = profile?.plans.monthly.elite
  const monthly_premium = profile?.plans.monthly.premium


  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">Booking Plans</CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground">Choose the perfect learning plan for your needs</p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <Tabs defaultValue="instant" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="instant" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Instant</span>
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Weekly</span>
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Monthly</span>
            </TabsTrigger>
          </TabsList>

          {/* Instant Sessions */}
          <TabsContent value="instant" className="space-y-3 sm:space-y-4">
            <div className="space-y-4">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-3 ">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 ">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm sm:text-base">Instant</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">{instant?.description}</p>
                      < ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
                        {instant?.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">

                        {/* <Badge variant="outline" className="text-success border-success text-xs w-fit">
                            {/* {session.availability}
                          </Badge> */}
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-xl sm:text-2xl font-bold text-primary">${instant?.price}</div>
                      <span className="flex items-center justify-end gap-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        {/* {session.duration} */}30 min
                      </span>

                      <Button variant="outline" className="mt-2 " size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Weekly Plans */}
          <TabsContent value="weekly" className="space-y-3 sm:space-y-4">
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {/* weakly basic */}
              <Card
                className={`relative ${false ? 'border-primary shadow-elegant' : 'border-border'} hover:shadow-lg transition-all`}
              >
                {false && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">Weekly Basic</h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}

                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">${weekly_basic?.price}</span>
                      {/*  {plan.originalPrice && (
                          <span className="text-sm sm:text-lg text-muted-foreground line-through">${plan.originalPrice}</span>
                        )} */}
                    </div>
                    {/* {plan.savings && (
                        <p className="text-xs sm:text-sm text-success text-green-700 dark:text-green-500">Save ${plan.savings}</p>
                      )} */}
                  </div>

                  <ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
                    {weekly_basic?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={false ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
              {/* weekly intensive */}
              <Card
                className={`relative ${true ? 'border-primary shadow-elegant' : 'border-border'} hover:shadow-lg transition-all`}
              >
                {true && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">Weekly Intensive</h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}

                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">${weekly_intensive?.price}</span>
                      {/*  {plan.originalPrice && (
                          <span className="text-sm sm:text-lg text-muted-foreground line-through">${plan.originalPrice}</span>
                        )} */}
                    </div>
                    {/* {plan.savings && (
                        <p className="text-xs sm:text-sm text-success text-green-700 dark:text-green-500">Save ${plan.savings}</p>
                      )} */}
                  </div>

                  <ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
                    {weekly_intensive?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={true ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Monthly Plans */}
          <TabsContent value="monthly" className="">
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:auto-rows-fr sm:gap-3 xl:flex xl:flex-col xl:gap-4">
              {/*               {monthlyPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative ${plan.popular ? 'border-primary shadow-elegant ' : 'border-border'} h-full  hover:shadow-lg transition-all`}
                >
                  {plan.popular && (
                    <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                      <Star className="" />
                      Best Value
                    </Badge>
                  )}
                  <CardContent className="p-4 flex flex-col sm:h-full">
                    <h4 className="font-semibold text-base sm:text-lg mb-2">{plan.title}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{plan.sessions}</p>

                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-bold text-primary">${plan.price}</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">/month</span>
                      </div>
                      {plan.originalPrice && (
                        <>
                          <p className="text-xs sm:text-sm text-muted-foreground line-through">${plan.originalPrice}</p>
                          <p className="text-xs sm:text-sm text-green-700 dark:text-green-500">Save ${plan.savings}</p>
                        </>
                      )}
                    </div>

                    <ul className="space-y-2 mb-4 sm:mb-6 sm:flex-grow">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full  sm:mt-auto"
                      size="sm"
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))} */}

              {/* standard */}
              <Card
                className={`relative ${false ? 'border-primary shadow-elegant' : 'border-border'} hover:shadow-lg transition-all`}
              >
                {false && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">Standard</h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}

                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary ">${monthly_standard?.price}</span>
                      {/*  {plan.originalPrice && (
                          <span className="text-sm sm:text-lg text-muted-foreground line-through">${plan.originalPrice}</span>
                        )} */}
                    </div>
                    {/* {plan.savings && (
                        <p className="text-xs sm:text-sm text-success text-green-700 dark:text-green-500">Save ${plan.savings}</p>
                      )} */}
                  </div>

                  <ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
                    {monthly_standard?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={false ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
              {/* elite */}
              <Card
                className={`relative ${true ? 'border-primary shadow-elegant' : 'border-border'} hover:shadow-lg transition-all`}
              >
                {true && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">Elite</h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}

                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">${monthly_elite?.price}</span>
                      {/*  {plan.originalPrice && (
                          <span className="text-sm sm:text-lg text-muted-foreground line-through">${plan.originalPrice}</span>
                        )} */}
                    </div>
                    {/* {plan.savings && (
                        <p className="text-xs sm:text-sm text-success text-green-700 dark:text-green-500">Save ${plan.savings}</p>
                      )} */}
                  </div>

                  <ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
                    {monthly_elite?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={true ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
              {/* premium */}
              <Card
                className={`relative ${false ? 'border-primary shadow-elegant' : 'border-border'} hover:shadow-lg transition-all`}
              >
                {false && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">Premium</h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}

                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">${monthly_premium?.price}</span>
                      {/*  {plan.originalPrice && (
                          <span className="text-sm sm:text-lg text-muted-foreground line-through">${plan.originalPrice}</span>
                        )} */}
                    </div>
                    {/* {plan.savings && (
                        <p className="text-xs sm:text-sm text-success text-green-700 dark:text-green-500">Save ${plan.savings}</p>
                      )} */}
                  </div>

                  <ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
                    {monthly_premium?.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={false ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>

            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card >
  );
}

export default BookingPlans