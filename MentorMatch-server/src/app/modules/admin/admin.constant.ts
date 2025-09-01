export const ADMIN_ROLE = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
} as const;

export type TAdminRole = (typeof ADMIN_ROLE)[keyof typeof ADMIN_ROLE];