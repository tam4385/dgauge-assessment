import { assessmentJobService } from "services/assessment-job-service";

export const assessmentController = {
  getAssessmentsJobResult: async () => {
    const assessments = await assessmentJobService.getAllAssessmentJobs();
    return assessments;
  },
};
