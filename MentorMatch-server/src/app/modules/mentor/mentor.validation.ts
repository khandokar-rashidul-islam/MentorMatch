import { z } from "zod";
import { APPROVAL_STATUS } from "../user/user.constant";

export const mentorProfileSchema = z.object({
  profileImage: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  phone: z.string().optional(),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Birth date must be YYYY-MM-DD" })
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
    .optional()
    .default(APPROVAL_STATUS.PENDING), // safer default
});

// type
export type MentorProfileInput = z.infer<typeof mentorProfileSchema>;
