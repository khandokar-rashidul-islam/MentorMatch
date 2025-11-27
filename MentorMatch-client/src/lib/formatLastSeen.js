
export const formatLastSeen = (timestamp) => {
  if (!timestamp) return "Offline";

  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Active a moment ago";
  if (mins < 60) return `Active ${mins} min ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Active ${hrs} hr ago`;

  const days = Math.floor(hrs / 24);
  return `Active ${days} day${days > 1 ? "s" : ""} ago`;
};

