import { appConfig } from 'potber-client/config/app.config';

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

/**
 * Debounces the given callback function, which means it's being called after the given delay, but only once per usecase.
 * Every call will reset the delay timer.
 * @param callback The callback function.
 * @param delay The delay in miliseconds.
 */
export function debounce<TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => PromiseLike<TReturn> | TReturn,
  delay: number,
) {
  let timer: number;

  return (...args: TArgs): Promise<TReturn> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), delay);
    });
  };
}

/**
 * Determins whether it currently is christmas season. Used for showing christmas icons and emojis.
 */
export function isChristmasSeason() {
  const { christmasSeasonStart, christmasSeasonEnd } = appConfig;
  const now = new Date();
  const christmasSeasonStartDate = new Date(
    `${now.getFullYear()}-${christmasSeasonStart}`,
  );
  const christmasSeasonEndDate = new Date(
    `${now.getFullYear()}-${christmasSeasonEnd}`,
  );
  return now > christmasSeasonStartDate && now < christmasSeasonEndDate;
}
