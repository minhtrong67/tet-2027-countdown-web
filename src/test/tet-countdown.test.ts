import { describe, expect, it } from "vitest";

import { getTetCountdown, TET_NEW_YEAR_TIMESTAMP } from "@/lib/tet-countdown";

describe("Tết 2027 countdown", () => {
  it("ends at midnight in Vietnam on February 6, 2027", () => {
    expect(TET_NEW_YEAR_TIMESTAMP).toBe(Date.parse("2027-02-06T00:00:00+07:00"));
    expect(getTetCountdown(TET_NEW_YEAR_TIMESTAMP - 1000)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      isComplete: false,
    });
  });
});