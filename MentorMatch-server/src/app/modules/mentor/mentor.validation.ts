import { z } from "zod";
import { APPROVAL_STATUS } from "../user/user.constant";

// Registration schema
export const mentorProfileSchema = z.object({
  name: z.string().min(1),
  phone: z.string(),
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

// Edit schema for update — all fields optional + extra edit-time fields
export const mentorEditSchema = mentorProfileSchema.partial().extend({
  profileImage: z.string().optional(),
  about: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  tutoringPlans: z.array(z.string()).optional(),
  educationQualifications: z.array(z.string()).optional(),
  frequentlyAskedQuestions: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
});
