import type { AssessmentElr, JobResult } from "../../types";
import type { ResultsRow } from "../../types";
import { getLowestClearanceCategory } from "../../utils/category";
import type { ClearanceCategory } from "../../utils/category";
import { getMetersToMiles } from "../../utils/units";
import { getTrackCodes } from "../../utils/generic";

export function buildResults({
  elrs,
  jobsByJobId,
  codesToNames,
}: {
  elrs: AssessmentElr[];
  jobsByJobId: Map<number, JobResult[]>;
  codesToNames: Map<string, string>;
}): ResultsRow[] {
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
      const byTrack = jobResultsForElr.filter((r) => r.trackCode === trackCode);
      const structures = byTrack.reduce((sum, r) => sum + (r.count ?? 0), 0);
      const prohibited = byTrack
        .filter((r) => r.category === "Prohibit")
        .reduce((sum, r) => sum + (r.count ?? 0), 0);
      const categories = byTrack
        .map((r) => r.category)
        .filter(Boolean) as ClearanceCategory[];
      const clearanceCategory = getLowestClearanceCategory(categories);

      rows.push({
        type: "data",
        subDivision,
        milepost,
        mileageRange: {
          from: getMetersToMiles(elr.startMetres),
          to: getMetersToMiles(elr.endMetres),
        },
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
