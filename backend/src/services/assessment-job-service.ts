import { queryDb } from "../db/db.helper";
import type { JobResult } from "@prisma/client";

export const assessmentJobService = {
  getAllAssessmentJobs: async () => {
    const sql = "SELECT * FROM JobResult;";
    return await queryDb(sql) as JobResult[];
  },

  getAssessmentJobsByJobIds: async (jobIds: number[]) => {
    const formattedJobs = jobIds.map(id => `'${id}'`).join(',');
    const sql = `SELECT * FROM JobResult WHERE jobId IN (${formattedJobs});`;
    return await queryDb(sql) as JobResult[];
  }
};
