/**
 * Turns the given unix timestamp into a Date object.
 * @param timestamp The unix timestamp.
 * @returns The Date object.
 */
export function getDateFromUnixTimestamp(timestamp: string) {
  return new Date(parseInt(timestamp) * 1000);
}

/**
 * Returns a promise that resolves after the given amount of miliseconds.
 * @param ms The amount of miliseconds.
 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
