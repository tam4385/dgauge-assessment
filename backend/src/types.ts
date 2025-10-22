export type AssessmentElr = {

  id: number;
  assessmentElrId: number;
  ngdVersion: number;
  elr: string;
  trackCode: string;
  startMetres: number;
  endMetres: number;
  jobId: number;
};



export type ResultsRow = {
  type: "group" | "data";
  subDivision: string;
  milepost: string;
  displayName?: string;
  mileageRange?: {
    from: number;
    to: number;
  };
  id?: number;
  trackCode?: string;
  structures?: number;
  clearanceCategory?: string;
  prohibited?: number;
};

export type JobResult = {
  jobId: number;
  trackCode: string;
  count: number;
  category: string;
};

export type SubDivisionResults = {
  type: "group" | "data";
  subDivision: string;
  milepost: string;
  mileageRange: {
    from: number;
    to: number;
  };
  name: string;
  code: string;
  id?: number;
  trackCode?: string;
  structures?: number;
  clearanceCategory?: string;
  prohibited?: number;
};