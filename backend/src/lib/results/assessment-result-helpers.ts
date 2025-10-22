import type { AssessmentElr, JobResult } from "../../types";
import type { ResultsRow } from "../../types";


export const getMetersToMiles = (meters: number) => Number((meters / 1609.34).toFixed(2));

export const getLowestClearanceCategory = (categories: string[]): string => {
  if (categories.length === 0) return "Clear";
  if (categories.includes("Prohibit")) return "Prohibit";
  if (categories.includes("10mph")) return "10mph";
  return "Clear";
};

export const getTrackCodes = (jobResults: JobResult[], elr: AssessmentElr) => {
  const jobTrackCodes = jobResults.map(r => r.trackCode).filter(Boolean);
  const elrTrackCode = elr.trackCode ? [elr.trackCode] : [];
  // remove the duplicates
  return [...new Set([...jobTrackCodes, ...elrTrackCode])].sort();
};

export function buildResults({
    elrs,
    jobsByJobId,
    codesToNames,
  }: { elrs: AssessmentElr[]; jobsByJobId: Map<number, JobResult[]>; codesToNames: Map<string, string> }): ResultsRow[] {
    const rows: ResultsRow[] = [];
    const existingGroups = new Set<string>();
  
    for (const elr of elrs) {
      const [code, milepost] = elr.elr.split("-");
      const subDivision = codesToNames.get(code) ?? code;
  
      if (!existingGroups.has(subDivision)) {
        existingGroups.add(subDivision);
        rows.push({ type: "group", subDivision, milepost });
      }
  
      const jobResultsForElr = jobsByJobId.get(elr.jobId) ?? [];
      const trackCodes = getTrackCodes(jobResultsForElr, elr);
  
      for (const trackCode of trackCodes) {
        const byTrack = jobResultsForElr.filter(r => r.trackCode === trackCode);
        const structures = byTrack.reduce((sum, r) => sum + (r.count ?? 0), 0);
        const prohibited = byTrack
          .filter(r => r.category === "Prohibit")
          .reduce((sum, r) => sum + (r.count ?? 0), 0);
        const categories = byTrack.map(r => r.category).filter(Boolean) as string[];
        const clearanceCategory = getLowestClearanceCategory(categories);
  
        rows.push({
          type: "data",
          subDivision,
          milepost,
          mileageRange: { from: getMetersToMiles(elr.startMetres), to: getMetersToMiles(elr.endMetres) },
          id: elr.assessmentElrId,
          trackCode,
          structures,
          clearanceCategory,
          prohibited,
        });
      }
    }
  
    return rows;
  }