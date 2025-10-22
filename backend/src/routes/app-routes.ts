import { Router } from "express";
import { assessmentService } from "../services/assessment-service";
import { assessmentController } from "../controllers/assessment-controller";
import { assessmentJobService } from "../services/assessment-job-service";
import { assetService } from "../services/assets-service";
import { resultsController } from "../controllers/results-controller";

const router = Router();

router.use((_, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

router.get("/connect", (_, res) => {
  res.json({ connected: true });
});

router.get("/assessments", async (_, res) => {
  const assessments = await assessmentController.getAllAssessments();
  res.json(assessments);
});

router.get("/assessment-elrs", async (_, res) => {
  const elrs = await assessmentService.getAllAssessmentElrs();
  res.json(elrs);
});

router.get("/job-results", async (_, res) => {
  const assessments = await assessmentJobService.getAllAssessmentJobs();
  res.json(assessments);
});

router.get("/sub-divisions", async (_, res) => {
  const assessments = await assetService.getAllSubDivisions();
  res.json(assessments);
});

router.get("/results", async (req, res) => {
  const { projectId, assessmentId } = req.query;
  const results = await resultsController.getAssessmentResults(
    Number(projectId),
    Number(assessmentId)
  );
  res.json(results);
});

export default router;
