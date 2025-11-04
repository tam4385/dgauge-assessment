import { assessmentService } from "../services/assessment-service";
import { assessmentJobService } from "../services/assessment-job-service";
import { assetService } from "../services/assets-service";
import type { ResultsRow } from "../types";
import { buildResults } from "../lib/results/assessment-result-helpers";
import { groupBy } from "../utils/generic";
import { mapCodesAndNames } from "../utils/subDivisions";

export const resultsController = {
  getAssessmentResults: async function (
    _: number,
    assessmentId: number
  ): Promise<ResultsRow[]> {
    try {
      const elrs = await assessmentService.getAssessmentElrsByAssessmentId(
        assessmentId
      );

      if (elrs.length === 0) return [];

      const codes = elrs.map(({ elr }) => elr.split("-")[0]);
      const subDivisions = await assetService.getSubDivisionsByCodes(codes);
      const jobIds = elrs.map(({ jobId }) => jobId);
      const jobResults = await assessmentJobService.getAssessmentJobsByJobIds(
        jobIds
      );

      const jobsByJobId = groupBy(jobResults, (jobResult) => jobResult.jobId);
      const codesToNames = mapCodesAndNames(subDivisions);

      return buildResults({ elrs, jobsByJobId, codesToNames });
    } catch (error) {
      throw new Error(`Error getting assessment results: ${error}`);
    }
  },
};
