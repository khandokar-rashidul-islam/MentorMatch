import { z } from "zod";
import { APPROVAL_STATUS } from "../user/user.constant";

// Core fields for registration (no extra edit fields)
export const mentorProfileSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  nidOrBirthCertId: z.string().optional(),
  bankAccountNo: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  address: z.string().optional(),
  education: z.string().optional(),
  educationInstitute: z.string().optional(),
  profession: z.string().optional(),
  expertiseAreas: z.array(z.string()).optional(),
  bio: z.string().optional(),
  experienceYears: z.number().int().min(0).optional(),
  portfolioLink: z.string().url().optional(),
  approvalStatus: z
    .enum([
      APPROVAL_STATUS.PENDING,
      APPROVAL_STATUS.APPROVED,
      APPROVAL_STATUS.REJECTED,
    ])
    .optional(),
});

// Edit schema (all fields optional, includes extra edit fields)
export const mentorEditSchema = mentorProfileSchema.partial().extend({
  profileImage: z.string().optional(),
  about: z.string().optional(),
  skills: z.array(z.string()).optional(),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        organization: z.string(),
        year: z.string(),
        credentialId: z.string(),
      })
    )
    .optional(),
  educationDetails: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.string(),
        gpa: z.string(),
      })
    )
    .optional(),
  availability: z
    .array(
      z.object({
        day: z.string(),
         time: z.string()
      })
    )
    .optional(),
  plans: z
    .object({
      instant: z
        .object({
          price: z.number(),
          description: z.string(),
          features: z.array(z.string()),
        })
        .optional(),
      weekly: z
        .object({
          basic: z
            .object({
              price: z.number(),
              description: z.string(),
              features: z.array(z.string()),
            })
            .optional(),
          intensive: z
            .object({
              price: z.number(),
              description: z.string(),
              features: z.array(z.string()),
            })
            .optional(),
        })
        .optional(),
      monthly: z
        .object({
          standard: z
            .object({
              price: z.number(),
              description: z.string(),
              features: z.array(z.string()),
            })
            .optional(),
          premium: z
            .object({
              price: z.number(),
              description: z.string(),
              features: z.array(z.string()),
            })
            .optional(),
          elite: z
            .object({
              price: z.number(),
              description: z.string(),
              features: z.array(z.string()),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional(),
});



//*gig related validation schemas

const planSchema = z.object({
  price: z.number().nonnegative(),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
});

export const createGigSchema = z.object({
  body: z.object({
    gigTitle: z.string().min(3, "Gig title is required"),
    aboutGig: z.string().min(10, "About gig must be at least 10 characters"),
    status: z.enum(["active", "paused"]).optional(),
    relatedTopics: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    plans: z
      .object({
        instant: planSchema.optional(),
        weekly: z
          .object({
            basic: planSchema.optional(),
            intensive: planSchema.optional(),
          })
          .optional(),
        monthly: z
          .object({
            standard: planSchema.optional(),
            premium: planSchema.optional(),
            elite: planSchema.optional(),
          })
          .optional(),
      })
      .optional(),
    faqs: z
      .array(
        z.object({
          question: z.string().min(1),
          answer: z.string().min(1),
        })
      )
      .optional(),
  }),
});

//* gig update validation schema

export const updateGigSchema = z.object({
  body: z.object({
    gigTitle: z.string().min(3).optional(),
    aboutGig: z.string().min(10).optional(),
    status: z.enum(["active", "paused"]).optional(),
    relatedTopics: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    plans: z
      .object({
        instant: planSchema.optional(),
        weekly: z
          .object({
            basic: planSchema.optional(),
            intensive: planSchema.optional(),
          })
          .optional(),
        monthly: z
          .object({
            standard: planSchema.optional(),
            premium: planSchema.optional(),
            elite: planSchema.optional(),
          })
          .optional(),
      })
      .optional(),
    faqs: z
      .array(
        z.object({
          question: z.string().min(1).optional(),
          answer: z.string().min(1).optional(),
        })
      )
      .optional(),
  }),
});

