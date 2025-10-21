
FULL-Stack Test

Notes:
 - Had a lot of fun with this one, it looked like a lot of effort went into to make it mirror day to day stuff at Dgauge, really appreciate that!
 - Was adding and committing as I went but was inside the backend repo and pushed the frontend and backend from the root. Apologies for that.
 - The flow of commits went: fetch data needed -> manipulate data to get to the ideal structure -> some minor refactoring and cleaning up.
 - The code is still quite raw and ugly, I just have not had the time to get it exactly how I want it, hoping to have it cleaner in the next couple ways.
 - Was consious the whole time of testing, the Cypress tests were really helpful to get insights into the final results, had used that as the structure I wanted to transform the data into

Improvements I'd make:
 - Clean up the code. Would do one of 2 things depending on the existing codebase style. Would either convert to a class and split functions into methods to be used and that pass data from one step to the next, or cleanup the existing file using function composition.
 - Would write unit tests for those methods, functions etc.
 - Add error handling at each layer.
 - Add defensive code to protect against unexpected data and use specific error exceptions and handle them in the controller.
 - The SQL statements were SELECT *. I would make them more specific for performance.
 - Would look at tactics for improving performance, e.g. concurrency.

 Frontend: 
 - Had unused components. All logic was in the pages.
 - Add error handling
