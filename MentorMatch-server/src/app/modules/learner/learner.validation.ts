import { z } from "zod";

export const learnerProfileSchema = z.object({
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
});

// type
export type LearnerProfileInput = z.infer<typeof learnerProfileSchema>;
