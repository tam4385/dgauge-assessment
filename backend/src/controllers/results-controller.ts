import { assessmentService } from "../services/assessment-service";
import { assessmentJobService } from "../services/assessment-job-service";
import { assetService } from "../services/assets-service";
import type { AssessmentElr, JobResult } from "@prisma/client";
import type { ResultsRow } from "../types";

const getMetersToMiles = (meters: number) => Number((meters / 1609.34).toFixed(2));

const getLowestClearanceCategory = (categories: string[]): string => {
  if (categories.length === 0) return "Clear";
  if (categories.includes("Prohibit")) return "Prohibit";
  if (categories.includes("10mph")) return "10mph";
  return "Clear";
};

const getTrackCodes = (jobResults: JobResult[], elr: AssessmentElr) => {
  const jobTrackCodes = jobResults.map(r => r.trackCode).filter(Boolean);
  const elrTrackCode = elr.trackCode ? [elr.trackCode] : [];
  // remove the duplicates
  return [...new Set([...jobTrackCodes, ...elrTrackCode])].sort();
};

export const resultsController = {
  getAssessmentResults: async function (
    projectId: number,
    assessmentId: number
  ): Promise<ResultsRow[]> {
    try {
      const promises = [];
      promises.push(assessmentService.getAssessment(assessmentId, projectId));
      promises.push(assessmentService.getAssessmentElrsByAssessmentId(assessmentId));
      
      const [assessment, elrs] = await Promise.all(promises);
      
      // get subdivisions
      const codes = elrs.map(({elr}) => elr.split("-")[0]);
      const subDivisions = await assetService.getSubDivisionsByCodes(codes);
      // hash map to keep track of subdivision names, e.g. AB -> Aberdeen
      const codesToNames = new Map<string, string>();
      subDivisions.forEach((sd) => codesToNames.set(sd.code, sd.name));

      // get jobs
      const jobIds = elrs.map(({jobId}) => jobId);
      const jobResults = await assessmentJobService.getAssessmentJobsByJobIds(jobIds);
      
      // build a map to index job results by jobId
      const jobsByJobId = new Map<number, JobResult[]>();

      for (const job of jobResults) {
        const jobs = jobsByJobId.get(job.jobId) || [];
        jobs.push(job);
        jobsByJobId.set(job.jobId, jobs);
      }

      const rows: ResultsRow[] = [];
      const existingGroups = new Set<string>();

      // elrs link to jobs and sub-divisions, so use the elrs to build the rows
      for (const elr of elrs) {
        const [code, milepost] = elr.elr.split("-");
        const subDivision = codesToNames.get(code);

        // Add group row per sub-division
        if (!existingGroups.has(subDivision)) {
          existingGroups.add(subDivision);
          rows.push({
            type: "group",
            subDivision: subDivision,
            milepost: milepost,
          });
        }

        const jobResults = jobsByJobId.get(elr.jobId) ?? [];
        const trackCodes = getTrackCodes(jobResults, elr);
    
        for (const trackCode of trackCodes) {
          const jobResultsForTrackCode = jobResults.filter((r: JobResult) => r.trackCode === trackCode);
          const structures = jobResultsForTrackCode.reduce((s, r) => s + (r.count ?? 0), 0);
          
          // count structures in prohibit category
          const prohibited = jobResultsForTrackCode
            .filter((r: JobResult) => r.category === "Prohibit")
            .reduce((s: number, r: JobResult) => s + (r.count ?? 0), 0);

          const categories = jobResultsForTrackCode
            .map((result: JobResult) => result.category)
            .filter(Boolean) as string[];
          const clearanceCategory = getLowestClearanceCategory(categories);
    
          rows.push({
            type: "data",
            milepost,
            subDivision,
            mileageRange: { 
              from: getMetersToMiles(elr.startMetres), 
              to: getMetersToMiles(elr.endMetres) 
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
    } catch (error) {
      throw new Error(`Error getting assessment results: ${error}`);
    }
  },
};
