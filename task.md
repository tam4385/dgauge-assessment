# D/Gauge fullstack interview Task

- The application is set up with a basic framework to develop and test your development with node v22.11.0
- The frontend is designed to use typescript, redux, and cypress, webpack, but with no design framework (feel free to add one)
- The backend is designed to provide you with the data you need using a seeded database via Prisma
- The QA team has provided you with the expected results from the API, asserted by cypress
- You need to remove the hardcoded results and return the data in the expected format, using the database provided
- Please periodically Check-in your code to a local Git repository so that we can see the order in which you develop
- Feel free to use any additional packages or make architectural changes that will make both applications adhere to best practice, but bear in mind that the primary requirement is the top priority
- We understand that everyone has varying amounts of free time, so please don't be discouraged if you are unable to fully complete the requirements
  - We will consider any further developments you would have wished to make, if you supply notes filed under "If I had more time I would have..."

# Getting Started

# Prepare Backend

- in /backend, open a terminal and install all packages
- run the scripts 'build-db', 'seed-db', 'open-db' & 'dev'

# Prepare Frontend

- in /frontend, open a terminal and install all packages
- run the script 'build'
- run the script 'start'
- run the script 'cypress'
- Ensure all cypress tests pass, before you start

# Ready to develop

- Once the backend and frontend are ready to develop on, open the frontend (localhost:3000)
- Enter your name and store it too Redux
- Click 'Connect to API' to ensure your API connection is working
- Click 'View Database Tables', you should see all the data available in the seeded database.
- Click on any assessmentId in the Assessments table to take you to the Assessment Results
- The API is returning a hardcoded set of results for the assessment you clicked on, verified by cypress tests
- Developing the results data for this page is the primary requirement.

# Primary Requirement - API Results (Est. 3hrs)

- using the applications and data provided, return the expected payloads for assessments (91283, 91253, 91420)

# Business Logic

1. The rows in the table must exactly match the order the user populated their original route

- This means the table will not be sorted by subdivision, or milepost, or mileage range, however as the user didn't enter Track Codes, these should be sorted alphabetically

2. The mileage range needs to be returned in decimal miles rather than how it is store in metres

- Important: The order of 'from' and 'to' matters, it must return exactly how it was entered by the user, even if start is higher than end mileage

3. There will always be at least one row per mileage range, even if that row has zero structures. It is essential to include it and show it as 'Clear' since the user is interested in Clear vs Prohibited lines, how many structures they have is much less important.

4. The structures should be the Count of structures which are contained within that SubDivision, Milepost, Mileage Range and Track Code.

5. Clearance Category, should be the worst case Clearance category within that SubDivision, Milepost, Mileage Range and Track Code.

- from worst to best [Prohibit, 10mph, Clear]

6. Prohibits: This total shows the number of structures which are in clearance category 'Prohibit'

7. MilePost: The milepost code

# Data

1. The data sources will be in different databases so don't use any JOIN queries to retrieve your data
2. To assess your SQL, please only use the queryDb function in backend\src\db\db.helper.ts

3. Data Structure
   The following outlines the relationships between the data entities:

- [Assessment] has One or Many [AssessmentELR] = assessmentId -> assessmentId
- [AssessmentELR] has One or Many [JobResult] = jobId -> jobId
- [AssessmentELR] has One [Subdivision] = elr -> code \*Note elr [AW-XXB] = code [AW]

# Optional Enhancements

if you don't have time for these please note what your approach to this requirement would be

# Secondary Requirement - Web Results (Est. 2hrs)

- Add style to the Results table

# Business logic

1. If table has many rows, the table will need to be scrollable

- It is important to pin the header row
- It is important that the Go Back Button is always visible

2. Grouping Rows

- Sub-Division - Milepost Group Row, The group row should have a single column spanning across the entire table
  This group row should be titled "[Sub-Division] - [Milepost]" eg. "[Indianapolis Terminal] - [QSL]"
  The group header row should be displayed in "Avenir Medium" font face with colour black #000000, this is deliberately bolder than the standard child rows below it, so the group headers stand out background colour #fcfcfc. In the future we may make the Group Collapsible

3. Track Rows

- The Track rows should be displayed in font "Avenir Light" colour grey #7a7d7f, background colour white #ffffff.

- Columns

1. Blank: used to offset (40px)
2. Mileage Range: 2 Decimal Places with a "-" separator e.g.: "0.30mi - 3.08mi"
3. Track Code: Likely 6 characters e.g. 'BZ1BBR'
4. Structures: Number
5. Clearance Category: The colour of the related clearance “band” e.g: 10mph: yellow, prohibit: red, clear: green.
6. Prohibited: Number, ‘green’ for 0, ‘red’ for > 0
