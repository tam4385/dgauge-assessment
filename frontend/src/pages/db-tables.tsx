import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import AssessmentTable from "../components/assessments";
import AssessmentElrTable from "../components/assessmentElrs";
import ResultsTable from "../components/results";
import Subdivisions from "../components/subDivisions";

const DbTables: React.FC = () => {
  const { userName } = useSelector((state: RootState) => state);

  const [assessments, setAssessments] = React.useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/entry/assessments"
      );

      const data = await response.json();
      setAssessments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <p>
          Hello {userName}, please find the tables and their data you need to
          work with here
        </p>
        <p>
          <a href="/example">Example Output</a>
        </p>
      </div>
      <AssessmentTable />
      <AssessmentElrTable />
      <ResultsTable />
      <Subdivisions />
    </>
  );
};

export default DbTables;
