export function getCountdown(targetDate: string) {
  const datePart = targetDate.includes("T")
    ? targetDate.split("T")[0]
    : targetDate;
  const [year, month, day] = datePart.split("-").map(Number);
  const targetIso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T12:00:00`;
  const nowInMadrid = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" })
  );
  const diff = new Date(targetIso).getTime() - nowInMadrid.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function formatWeddingDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatFooterDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
