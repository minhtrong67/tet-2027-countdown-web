export const TET_NEW_YEAR_TIMESTAMP = Date.parse("2027-02-06T00:00:00+07:00");

export interface TetCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function getTetCountdown(now: number): TetCountdown {
  const remainingSeconds = Math.max(0, Math.floor((TET_NEW_YEAR_TIMESTAMP - now) / 1000));
  const days = Math.floor(remainingSeconds / 86_400);
  const hours = Math.floor((remainingSeconds % 86_400) / 3_600);
  const minutes = Math.floor((remainingSeconds % 3_600) / 60);
  const seconds = remainingSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: remainingSeconds === 0,
  };
}