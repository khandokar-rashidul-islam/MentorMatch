import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetActiveProfileQuery } from "../../redux/features/user/userApi";

const FAQSection = () => {
  const { data } = useGetActiveProfileQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const profile = data?.data?.user?.profile;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <p className="text-muted-foreground">
          Get answers to common questions about my tutoring services
        </p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {profile?.faqs.map((faq) => (
            <AccordionItem key={faq._id} value={faq._id}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQSection;
