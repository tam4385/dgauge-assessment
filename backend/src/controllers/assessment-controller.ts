import { assessmentService } from "../services/assessment-service";

export const assessmentController = {
  getAllAssessments: async () => {
    const assessments = await assessmentService.getAllAssessments();
    return assessments;
  },
  getAllAssessmentElrs: async () => {
    const assessmentElrs = await assessmentService.getAllAssessmentElrs();
    return assessmentElrs;
  },
};
