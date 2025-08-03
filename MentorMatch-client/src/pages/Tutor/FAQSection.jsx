import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
   const faqs = [
    {
      id: "1",
      question: "What is your teaching methodology?",
      answer: "I believe in a personalized approach where I first assess your current understanding, identify knowledge gaps, and then build a customized learning plan. I use visual aids, real-world examples, and interactive problem-solving to make concepts stick."
    },
    {
      id: "2",
      question: "How do you handle different learning styles?",
      answer: "I adapt my teaching methods to match your learning style. Whether you're a visual learner who benefits from diagrams and charts, an auditory learner who needs verbal explanations, or a kinesthetic learner who learns by doing, I adjust my approach accordingly."
    },
    {
      id: "3",
      question: "What technology do you use for online sessions?",
      answer: "I use professional video conferencing tools with interactive whiteboards, screen sharing capabilities, and recording features. Students receive session recordings for review, and I provide digital notes and resources."
    },
    {
      id: "4",
      question: "How do you track student progress?",
      answer: "I maintain detailed progress reports that track understanding of concepts, problem-solving skills, and areas for improvement. Regular assessments and feedback sessions ensure we're meeting your learning objectives."
    },
    {
      id: "5",
      question: "What is your cancellation policy?",
      answer: "Sessions can be cancelled up to 24 hours in advance for a full refund or rescheduling. Cancellations within 24 hours are charged 50% of the session fee, except for emergencies which are handled case-by-case."
    },
    {
      id: "6",
      question: "Do you provide homework help?",
      answer: "Yes! I help with homework assignments, but I focus on teaching you the underlying concepts rather than just giving answers. This ensures you understand the material and can tackle similar problems independently."
    },
    {
      id: "7",
      question: "How long are your typical sessions?",
      answer: "Standard sessions are 60 minutes, but I also offer 30-minute quick help sessions and 90-minute intensive sessions for complex topics or exam preparation. The length depends on your needs and learning goals."
    },
    {
      id: "8",
      question: "Do you offer group sessions?",
      answer: "Yes, I offer small group sessions (2-4 students) at a reduced rate per person. This works well for study groups or friends who want to learn together while still receiving personalized attention."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <p className="text-muted-foreground">Get answers to common questions about my tutoring services</p>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default FAQSection