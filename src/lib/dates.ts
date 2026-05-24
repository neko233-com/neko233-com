const rssFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Asia/Shanghai",
  hour12: false,
});

export function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${year}.${month}.${day}`;
}

export function formatRssDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00+08:00`);
  const parts = rssFormatter.formatToParts(date);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${lookup.weekday}, ${lookup.day} ${lookup.month} ${lookup.year} ${lookup.hour}:${lookup.minute}:${lookup.second} +0800`;
}
