import { z } from "zod";
import { learnerProfileSchema } from "../learner/learner.validation";
import { mentorProfileSchema } from "../mentor/mentor.validation";

export const userRegistrationSchema = z
  .object({
    user: z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(20, { message: "Password cannot exceed 20 characters" }),
    }),
    role: z.enum(["admin", "learner", "mentor"], {
      errorMap: () => ({
        message: "Role must be one of admin, learner, or mentor",
      }),
    }),
    learnerProfile: learnerProfileSchema.optional(), // optional now
    mentorProfile: mentorProfileSchema.optional(), // required only for mentor-specific data
  })
  .superRefine((data, ctx) => {
    if (data.role === "learner") {
      if (!data.learnerProfile) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Learner profile is required when role is learner",
          path: ["learnerProfile"],
        });
      }
    }

    if (data.role === "mentor") {
      if (!data.mentorProfile) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mentor profile is required when role is mentor",
          path: ["mentorProfile"],
        });
      }
      // learnerProfile can be optional here because we create fallback automatically
    }

    if (data.role === "admin") {
      if (data.learnerProfile || data.mentorProfile) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Admin should not have learner or mentor profiles",
          path: ["role"],
        });
      }
    }
  });

export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
