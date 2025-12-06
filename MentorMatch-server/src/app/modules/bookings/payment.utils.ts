import { addDays } from "date-fns";

/**
 * Calculate endDate and sessions depending on plan
 * returns { durationMinutes, totalSessions, endDate }
 */
export const getPlanMeta = (planType: string) => {
  // Default values — adapt if your gig stores different session counts
  if (planType === "instant") {
    const durationPerSessionMinutes = 60;
    return {
      durationPerSessionMinutes,
      durationSessions: 1,
      endDate: null, // instant is single session; you might set expiry to +7 days
    };
  }

  if (planType === "weekly") {
    const durationPerSessionMinutes = 60;
    const durationSessions = 3; // example: 3 sessions per week
    const endDate = addDays(new Date(), 7);
    return { durationPerSessionMinutes, durationSessions, endDate };
  }

  // monthly
  const durationPerSessionMinutes = 60;
  const durationSessions = 12; // 3 per week (example)
  const endDate = addDays(new Date(), 30);
  return { durationPerSessionMinutes, durationSessions, endDate };
};
