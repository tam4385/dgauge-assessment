import { JobResult, AssessmentElr } from "../types";
import { DEFAULT_TRACK_CODE } from "../lib/results/consts";

export const groupBy = <T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Map<K, T[]> => {
  const map = new Map();

  for (const item of items) {
    const key = keyFn(item);
    const group = map.get(key);
    if (group) {
      group.push(item);
    } else {
      map.set(key, [item]);
    }
  }

  return map;
};

export const isValidTrackCode = (code: unknown): code is string => {
  return (
    typeof code === "string" &&
    code.trim() !== "" &&
    code.toLowerCase() !== "null"
  );
};

/**
 * Returns sorted list of track codes for a given ELR and its job results.
 * If job results contain valid track codes, those are used.
 * If ELR has a valid track code and none from jobs, that is used.
 * If neither exists, returns a default code "ALL" to ensure at least one row per mileage range.
 * Invalid codes (blank string, "null" string, null/undefined) are filtered out.
 */
export const getTrackCodes = (
  jobResults: JobResult[],
  elr: AssessmentElr
): string[] => {
  const jobTrackCodes = jobResults
    .map((r) => r.trackCode)
    .filter(isValidTrackCode);

  const elrCode = elr.trackCode;
  const codesFromElr = isValidTrackCode(elrCode) ? [elrCode] : [];
  const uniqueCodes = Array.from(new Set([...jobTrackCodes, ...codesFromElr]));

  // When there are no valid track codes, use ALL
  if (uniqueCodes.length === 0) {
    return [DEFAULT_TRACK_CODE];
  }

  return uniqueCodes.sort();
};
