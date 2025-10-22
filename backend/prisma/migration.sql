-- CreateTable
CREATE TABLE "Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY,
    "assessmentId" INTEGER NOT NULL UNIQUE,
    "projectId" INTEGER NOT NULL,
    "createdDate" DATETIME NOT NULL,
    "createdUserId" INTEGER NOT NULL,
    "assessmentStatusId" INTEGER NOT NULL,
    "inputs" TEXT, -- JSON field stored as TEXT in SQLite
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

-- CreateTable for AssessmentElr
CREATE TABLE "AssessmentElr" (
    "id" INTEGER NOT NULL PRIMARY KEY,
    "assessmentElrId" INTEGER NOT NULL UNIQUE,
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

CREATE TABLE "JobResult" (
    "id" INTEGER NOT NULL PRIMARY KEY ,
    "jobId" INTEGER NOT NULL,
    "trackCode" TEXT NULL,
    "count" INTEGER NULL,
    "category" TEXT NULL
);

CREATE TABLE "SubDivision" (
    "id" INTEGER NOT NULL PRIMARY KEY,
    "regionRouteId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "elrs" TEXT NOT NULL -- JSON array stored as TEXT
);