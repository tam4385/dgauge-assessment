import { assessmentService } from "../services/assessment-service";
import { assessmentJobService } from "../services/assessment-job-service";
import { assetService } from "../services/assets-service";
import type { ResultsRow, JobResult } from "../types";
import { buildResults } from "../lib/results/assessment-result-helpers";

export const resultsController = {
  getAssessmentResults: async function (
    projectId: number,
    assessmentId: number
  ): Promise<ResultsRow[]> {
    try {
      const [assessment, elrs] = await Promise.all([
        assessmentService.getAssessment(assessmentId, projectId),
        assessmentService.getAssessmentElrsByAssessmentId(assessmentId)
      ]);
      
      if (elrs.length === 0) return [];

      const codes = elrs.map(({elr}) => elr.split("-")[0]);
      const subDivisions = await assetService.getSubDivisionsByCodes(codes);
      const codesToNames = new Map<string, string>();
      subDivisions.forEach((sd) => codesToNames.set(sd.code, sd.name));
      const jobIds = elrs.map(({jobId}) => jobId);
      const jobResults = await assessmentJobService.getAssessmentJobsByJobIds(jobIds);
      
      const jobsByJobId = new Map<number, JobResult[]>();

      for (const jr of jobResults) {
        const list = jobsByJobId.get(jr.jobId) ?? [];
        list.push(jr);
        jobsByJobId.set(jr.jobId, list);
      }

      return buildResults({ elrs, jobsByJobId, codesToNames });
    } catch (error) {
      throw new Error(`Error getting assessment results: ${error}`);
    }
  },
};