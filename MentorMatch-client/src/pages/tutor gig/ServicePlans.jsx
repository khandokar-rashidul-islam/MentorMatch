import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar, Users, CheckCircle, Star } from "lucide-react";
import PlanModal from "./PlanModal";

const ServicePlans = ({ plans, gigId }) => {
  const instant = plans?.instant;
  const weekly_basic = plans?.weekly.basic;
  const weekly_intensive = plans?.weekly.intensive;

  const monthly_standard = plans?.monthly.standard;
  const monthly_elite = plans?.monthly.elite;
  const monthly_premium = plans?.monthly.premium;

  //dummy data
  const popular = true;
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (planInfo) => {
    setSelectedPlan(planInfo);
    setOpenModal(true);
  };

  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">Booking Plans</CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground">
          Choose the perfect learning plan for your needs
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <Tabs defaultValue="instant" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger
              value="instant"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm"
            >
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Instant</span>
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Weekly</span>
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm"
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Monthly</span>
            </TabsTrigger>
          </TabsList>

          {/* Instant Sessions */}
          <TabsContent value="instant" className="space-y-3 sm:space-y-4">
            <div className="space-y-4">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-3 ">
                  <div className="flex flex-col gap-3 ">
                    <div className=" flex flex-col flex-grow gap-3">
                      <p className="font-semibold text-xl sm:text-2xl">
                        Instant
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {instant?.description}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {instant?.durationSessions} sessions •{" "}
                        {instant?.durationPerSessionMinutes} minutes session
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {instant?.price} taka
                      </p>
                      <ul className="space-y-2 mb-4 sm:mb-6 flex-grow">
                        {instant?.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-xs sm:text-sm"
                          >
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0 text-primary " />
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
                    <div className="text-center">
                      <Button
                        variant="outline"
                        className=" w-full cursor-pointer"
                        size="sm"
                        onClick={() =>
                          handleSelectPlan({
                            gigId,
                            title: "Instant Session",
                            type: "instant",
                            packageName: null,
                            price: instant?.price,
                            durationSessions: instant?.durationSessions,
                            durationPerSessionMinutes:
                              instant?.durationPerSessionMinutes,
                            features: instant?.features,
                          })
                        }
                      >
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
                className={`relative ${
                  popular === false
                    ? "border-primary shadow-elegant"
                    : "border-border"
                } hover:shadow-lg transition-all`}
              >
                {popular === false && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">
                    Weekly Basic
                  </h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {weekly_basic?.description}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {weekly_basic?.durationSessions} sessions •{" "}
                      {weekly_basic?.durationPerSessionMinutes} minutes session
                    </p>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {weekly_basic?.price} taka
                      </span>
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
                      <li
                        key={index}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0 text-primary " />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={popular === false ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                    onClick={() =>
                      handleSelectPlan({
                        gigId,
                        title: "Weekly Basic",
                        type: "weekly",
                        packageName: "basic",
                        price: weekly_basic?.price,
                        durationSessions: weekly_basic?.durationSessions,
                        durationPerSessionMinutes:
                          weekly_basic?.durationPerSessionMinutes,
                        features: weekly_basic?.features,
                      })
                    }
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
              {/* weekly intensive */}
              <Card
                className={`relative ${
                  popular === true
                    ? "border-primary shadow-elegant"
                    : "border-border"
                } hover:shadow-lg transition-all`}
              >
                {popular === true && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">
                    Weekly Intensive
                  </h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {weekly_intensive?.description}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {weekly_intensive?.durationSessions} sessions •{" "}
                      {weekly_intensive?.durationPerSessionMinutes} minutes
                      session
                    </p>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {weekly_intensive?.price} taka
                      </span>
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
                      <li
                        key={index}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0 text-primary " />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={popular === true ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                    onClick={() =>
                      handleSelectPlan({
                        gigId,
                        title: "Weekly Intensive",
                        type: "weekly",
                        packageName: "intensive",
                        price: weekly_intensive?.price,
                        durationSessions: weekly_intensive?.durationSessions,
                        durationPerSessionMinutes:
                          weekly_intensive?.durationPerSessionMinutes,
                        features: weekly_intensive?.features,
                      })
                    }
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
              {/* {monthlyPlans.map((plan) => (
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
                className={`relative ${
                  popular === false
                    ? "border-primary shadow-elegant"
                    : "border-border"
                } hover:shadow-lg transition-all`}
              >
                {popular === false && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">
                    Standard
                  </h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {monthly_standard?.description}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {monthly_standard?.durationSessions} sessions •{" "}
                      {monthly_standard?.durationPerSessionMinutes} minutes
                      session
                    </p>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary ">
                        {monthly_standard?.price} taka
                      </span>
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
                      <li
                        key={index}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={popular === false ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                    onClick={() =>
                      handleSelectPlan({
                        gigId,
                        title: "Monthly Standard",
                        type: "monthly",
                        packageName: "standard",
                        price: monthly_standard?.price,
                        durationSessions: monthly_standard?.durationSessions,
                        durationPerSessionMinutes:
                          monthly_standard?.durationPerSessionMinutes,
                        features: monthly_standard?.features,
                      })
                    }
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
              {/* elite */}
              <Card
                className={`relative ${
                  popular === true
                    ? "border-primary shadow-elegant"
                    : "border-border"
                } hover:shadow-lg transition-all`}
              >
                {popular === true && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">
                    Elite
                  </h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {monthly_elite?.description}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {monthly_elite?.durationSessions} sessions •{" "}
                      {monthly_elite?.durationPerSessionMinutes} minutes session
                    </p>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {monthly_elite?.price} taka
                      </span>
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
                      <li
                        key={index}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={popular === true ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                    onClick={() =>
                      handleSelectPlan({
                        gigId,
                        title: "Monthly Elite",
                        type: "monthly",
                        packageName: "elite",
                        price: monthly_elite?.price,
                        durationSessions: monthly_elite?.durationSessions,
                        durationPerSessionMinutes:
                          monthly_elite?.durationPerSessionMinutes,
                        features: monthly_elite?.features,
                      })
                    }
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
              {/* premium */}
              <Card
                className={`relative ${
                  popular === false
                    ? "border-primary shadow-elegant"
                    : "border-border"
                } hover:shadow-lg transition-all`}
              >
                {popular === false && (
                  <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-xs text-primary">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                <CardContent className="p-4 sm:p-6 flex flex-col h-full ">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">
                    Premium
                  </h4>
                  {/* <p className="text-xs  text-muted-foreground mb-3 sm:mb-4">
                      {plan.sessions} <br />• {plan.duration}</p> */}
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {monthly_premium?.description}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {monthly_premium?.durationSessions} sessions •{" "}
                      {monthly_premium?.durationPerSessionMinutes} minutes
                      session
                    </p>
                  </div>
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-baseline flex-wrap gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {monthly_premium?.price} taka
                      </span>
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
                      <li
                        key={index}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0 text-primary " />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={popular === false ? "default" : "outline"}
                    className="w-full mt-auto"
                    size="sm"
                    onClick={() =>
                      handleSelectPlan({
                        gigId,
                        title: "Monthly Premium",
                        type: "monthly",
                        packageName: "premium",
                        price: monthly_premium?.price,
                        durationSessions: monthly_premium?.durationSessions,
                        durationPerSessionMinutes: monthly_premium?.durationPerSessionMinutes,
                        features: monthly_premium?.features,
                      })
                    }
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <PlanModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        plan={selectedPlan}
        gigId={gigId}
      />
    </Card>
  );
};
export default ServicePlans;
