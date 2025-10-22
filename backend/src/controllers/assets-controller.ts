import { assessmentService } from "../services/assessment-service";

export const assessmentController = {
  getAllSubDivisions: async () => {
    const assessments = await assessmentService.getAllAssessments();
    return assessments;
  },
};
