// assessment-result-helpers.test.ts

import { buildResults } from "./assessment-result-helpers";
import type { AssessmentElr, JobResult, ResultsRow } from "../../types";
import { ClearanceCategory } from "../../utils/category";

// Constants for convenience
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
      ngdVersion: 0, // or whatever version your type uses
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
    // mileage conversion check (startMetres=0 => 0 miles, endMetres ~1609.34 => ~1.00 mile)
    expect(dataRow.mileageRange.from).toBe(0);
    expect(dataRow.mileageRange.to).toBeCloseTo(1.0, 2);
  });

  it("should correctly sum structures, compute prohibited, clearanceCategory and include multiple trackCodes", () => {
    const elr: AssessmentElr = {
      assessmentElrId: 2,
      elr: "X1-MP2",
      startMetres: 0,
      endMetres: 3218.68, // ~2 miles
      jobId: 99,
      trackCode: "ELRTRACK",
    };
    const jobResults: JobResult[] = [
      { id: 101, jobId: 99, trackCode: "A", count: 5, category: "Clear" },
      { id: 102, jobId: 99, trackCode: "A", count: 3, category: "Prohibit" },
      { id: 103, jobId: 99, trackCode: "B", count: 2, category: "10mph" },
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

    // There should be one row for trackCode "A", one for "B", one for “ELRTRACK”?
    // but since jobTrackCodes contain A and B, you'll get sorted ["A","B","ELRTRACK"] or depending logic.
    const dataRows = rows.filter((r) => r.type === "data");
    const trackCodes = dataRows.map((r) => (r as any).trackCode).sort();
    expect(trackCodes).toEqual(["A", "B", "ELRTRACK"].sort());

    const rowA = dataRows.find((r) => (r as any).trackCode === "A")!;
    expect((rowA as any).structures).toBe(5 + 3);
    expect((rowA as any).prohibited).toBe(3);
    expect((rowA as any).clearanceCategory).toBe(ClearanceCategory.Prohibit);

    const rowB = dataRows.find((r) => (r as any).trackCode === "B")!;
    expect((rowB as any).structures).toBe(2);
    expect((rowB as any).prohibited).toBe(0);
    expect((rowB as any).clearanceCategory).toBe(ClearanceCategory["10mph"]);

    const rowELR = dataRows.find((r) => (r as any).trackCode === "ELRTRACK")!;
    expect((rowELR as any).structures).toBe(0); // no jobResults for ELRTRACK
    expect((rowELR as any).prohibited).toBe(0);
    expect((rowELR as any).clearanceCategory).toBe(ClearanceCategory.Clear);
  });
});
