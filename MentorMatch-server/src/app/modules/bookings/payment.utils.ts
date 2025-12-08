
// Helper function
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getPlanMeta = (planType: string) => {
  if (planType === "instant") {
    // Instant sessions are usually valid for 24-48 hours until scheduled
    return {
      durationPerSessionMinutes: 60,
      durationSessions: 1,
      endDate: addDays(new Date(), 2),
    };
  }

  if (planType === "weekly") {
    return {
      durationPerSessionMinutes: 60,
      durationSessions: 3,
      endDate: addDays(new Date(), 7),
    };
  }

  // Monthly
  return {
    durationPerSessionMinutes: 60,
    durationSessions: 12,
    endDate: addDays(new Date(), 30),
  };
};
