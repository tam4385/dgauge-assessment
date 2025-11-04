// assessment-result-helpers.test.ts

import { buildResults } from "./assessment-result-helpers";
import type { AssessmentElr, JobResult, ResultsRow } from "../../types";
import { ClearanceCategory } from "../../utils/category";

// Default used by getTrackCodes when no track code is supplied and no job results exist
const DEFAULT_TRACK_CODE = "ALL";

describe("buildResults", () => {
  it("should return empty array when no elrs", () => {
    const rows = buildResults({
      elrs: [],
      jobsByJobId: new Map(),
      codesToNames: new Map(),
    });
    expect(rows).toEqual([]);
  });

  it("should produce one data row with default trackCode when elr has no jobResults & no valid elr.trackCode", () => {
    const elr: AssessmentElr = {
      id: 1,
      ngdVersion: 0,
      assessmentElrId: 1,
      elr: "CODE-MP1",
      startMetres: 0,
      endMetres: 1609.34,
      jobId: 42,
      trackCode: null,
    };
    const codesToNames = new Map([["CODE", "SubdivisionName"]]);
    const rows = buildResults({
      elrs: [elr],
      jobsByJobId: new Map([[42, []]]),
      codesToNames,
    });

    expect(rows.length).toBe(2);

    // first row is group
    expect(rows[0]).toEqual({
      type: "group",
      subDivision: "SubdivisionName",
      milepost: "MP1",
    });

    // second row is data row
    const dataRow = rows[1] as ResultsRow & {
      trackCode: string;
      mileageRange: { from: number; to: number };
    };
    expect(dataRow.type).toBe("data");
    expect(dataRow.trackCode).toBe(DEFAULT_TRACK_CODE);
    expect(dataRow.structures).toBe(0);
    expect(dataRow.clearanceCategory).toBe(ClearanceCategory.Clear);
    expect(dataRow.prohibited).toBe(0);
    expect(dataRow.mileageRange.from).toBe(0);
    expect(dataRow.mileageRange.to).toBeCloseTo(1.0, 2);
  });

  it("should correctly sum structures, compute prohibited, clearanceCategory and include trackCodes from jobResults", () => {
    const elr: AssessmentElr = {
      id: 1,
      ngdVersion: 0,
      assessmentElrId: 2,
      elr: "X1-MP2",
      startMetres: 0,
      endMetres: 3218.68, // ~2 miles
      jobId: 99,
      trackCode: "ELRTRACK",
    };
    const jobResults: JobResult[] = [
      { jobId: 99, trackCode: "A", count: 5, category: "Clear" },
      { jobId: 99, trackCode: "A", count: 3, category: "Prohibit" },
      { jobId: 99, trackCode: "B", count: 2, category: "10mph" },
    ];
    const jobsByJobId = new Map([[99, jobResults]]);
    const codesToNames = new Map([["X1", "SubDiv"]]);

    const rows = buildResults({
      elrs: [elr],
      jobsByJobId,
      codesToNames,
    });

    // expect first group row
    expect(rows[0]).toEqual({
      type: "group",
      subDivision: "SubDiv",
      milepost: "MP2",
    });

    // With jobResults present, the track codes should come from the job results only
    const dataRows = rows.filter((r) => r.type === "data");
    const trackCodes = dataRows.map((r) => (r as any).trackCode).sort();
    expect(trackCodes).toEqual(["A", "B"].sort());

    const rowA = dataRows.find((r) => (r as any).trackCode === "A")!;
    expect((rowA as any).structures).toBe(5 + 3);
    expect((rowA as any).prohibited).toBe(3);
    expect((rowA as any).clearanceCategory).toBe(ClearanceCategory.Prohibit);

    const rowB = dataRows.find((r) => (r as any).trackCode === "B")!;
    expect((rowB as any).structures).toBe(2);
    expect((rowB as any).prohibited).toBe(0);
    expect((rowB as any).clearanceCategory).toBe(ClearanceCategory["10mph"]);
  });
});
