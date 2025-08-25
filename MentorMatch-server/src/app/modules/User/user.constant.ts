export const USER_ROLES = {
  ADMIN: "admin",
  LEARNER: "learner",
  MENTOR: "mentor",
} as const;

export const APPROVAL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const USER_STATUS = {
  IN_PROGRESS: "in-progress",
  BLOCKED: "blocked",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];