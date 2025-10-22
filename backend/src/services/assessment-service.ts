import { AssessmentElr } from "@prisma/client";
import { queryDb } from "../db/db.helper";

export const assessmentService = {
  getAllAssessments: async () => {
    const sql = `SELECT * FROM Assessment;`;
    const results = await queryDb(sql);
    return results;
  },

  getAssessment: async (assessmentId: number, projectId: number) => {
    const sql = `SELECT * FROM Assessment 
      WHERE assessmentId = ${assessmentId} 
      AND projectId = ${projectId};`;
    const results = await queryDb(sql);
    return results;
  },

  getAssessmentElrsByAssessmentId: async (assessmentId: number) => {
    const sql = `SELECT * FROM AssessmentElr WHERE assessmentId = ${assessmentId};`;
    return await queryDb(sql) as AssessmentElr[];
  },

  getAllAssessmentElrs: async () => {
    const sql = "SELECT * FROM AssessmentElr;";
    const results = await queryDb(sql);
    return results;
  },
  getProjectAssessment: async (projectId: number, assessmentId: number) => {
    const sql = `SELECT * FROM Assessment WHERE projectId = ${projectId} AND assessmentId = ${assessmentId};`;
    const results = await queryDb(sql);
    return results;
  },
};
