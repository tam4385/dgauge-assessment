import { SubDivisionResults } from "types";

export const mapCodesAndNames = (
  subDivisions: SubDivisionResults[]
): Map<string, string> => {
  const map = new Map();
  subDivisions.forEach((sd) => map.set(sd.code, sd.name));
  return map;
};
