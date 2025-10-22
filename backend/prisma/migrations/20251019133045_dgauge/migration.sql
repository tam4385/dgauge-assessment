-- CreateTable
CREATE TABLE "Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assessmentId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdDate" DATETIME NOT NULL,
    "createdUserId" INTEGER NOT NULL,
    "assessmentStatusId" INTEGER NOT NULL,
    "inputs" JSONB NOT NULL,
    "assessmentTypeId" INTEGER NOT NULL,
    "calcStartTime" DATETIME,
    "cancelledDate" DATETIME,
    "cancelledUserId" INTEGER,
    "jobId" INTEGER,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "custom" TEXT,
    "numberOfCalculations" INTEGER NOT NULL,
    "reference" TEXT NOT NULL,
    "vehicleLoadTime" DATETIME,
    "firstBatchSlicesLoadTime" DATETIME,
    "startedUserId" INTEGER NOT NULL,
    "surveyId" INTEGER,
    "surveySource" TEXT NOT NULL,
    "numberOfSlices" INTEGER NOT NULL,
    "numberOfVehicles" INTEGER NOT NULL,
    "modifiedDate" DATETIME NOT NULL,
    "modifiedUserId" INTEGER NOT NULL,
    "surveyTypeId" INTEGER NOT NULL,
    "OutputVersion" INTEGER NOT NULL,
    "siteId" INTEGER,
    "excludeStructureTypeId" INTEGER,
    "companyId" INTEGER NOT NULL,
    "projectReference" INTEGER NOT NULL,
    "assessmentReference" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "AssessmentElr" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assessmentElrId" INTEGER NOT NULL,
    "ngdVersion" INTEGER NOT NULL,
    "elr" TEXT NOT NULL,
    "trackCode" TEXT,
    "startMetres" REAL NOT NULL,
    "endMetres" REAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "structureCount" INTEGER NOT NULL,
    "calculationCount" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "assessmentId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "JobResult" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jobId" INTEGER NOT NULL,
    "trackCode" TEXT,
    "count" INTEGER,
    "category" TEXT
);

-- CreateTable
CREATE TABLE "SubDivision" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "regionRouteId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "elrs" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_assessmentId_key" ON "Assessment"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentElr_assessmentElrId_key" ON "AssessmentElr"("assessmentElrId");
