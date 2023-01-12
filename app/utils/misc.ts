export function getDateFromUnixTimestamp(timestamp: string) {
  return new Date(parseInt(timestamp) * 1000);
}
