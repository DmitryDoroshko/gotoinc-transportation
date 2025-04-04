export const formatDateForUser = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatForBootstrapDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toISOString().split("T")[0];
};