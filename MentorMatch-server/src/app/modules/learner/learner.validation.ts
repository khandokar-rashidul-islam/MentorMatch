import { z } from "zod";

// Base schema for registration
export const learnerProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
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
});

// Edit schema for update — all fields optional + extra edit-time fields
export const learnerEditSchema = learnerProfileSchema.partial().extend({
  profileImage: z.string().optional(),
  about: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  tutoringPlans: z.array(z.string()).optional(),
  educationQualifications: z.array(z.string()).optional(),
  frequentlyAskedQuestions: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional(),
});
