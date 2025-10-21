import React from "react";
import { headerStyle, softKeyStyle } from "../styles/table-styles";

const AssessmentElrTable: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/entry/assessment-elrs"
      );

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const cellStyle = { border: "1px solid black" };
  const primaryKeyStyle = {
    ...cellStyle,
    background: "green",
    fontWeight: "bold",
  };
  const foreignKeyStyle = {
    ...cellStyle,
    background: "lightblue",
    fontWeight: "bold",
  };

  return (
    <div>
      <h2>Assessment ELRs</h2>
      <table>
        <thead>
          <tr>
            <th style={primaryKeyStyle}>assessmentElrId PK</th>
            <th style={softKeyStyle}>elr</th>
            <th style={headerStyle}>startMetres</th>
            <th style={headerStyle}>endMetres</th>
            <th style={foreignKeyStyle}>jobId</th>
            <th style={headerStyle}>structureCount</th>
            <th style={headerStyle}>sortOrder</th>
            <th style={foreignKeyStyle}>assessmentId FK</th>
            <th style={foreignKeyStyle}>projectId FK</th>
            <th style={foreignKeyStyle}>companyId FK</th>
          </tr>
        </thead>
        <tbody>
          {data.map((assessment, index) => (
            <tr key={index}>
              <td style={cellStyle}>{assessment.assessmentElrId}</td>
              <td style={cellStyle}>{assessment.elr}</td>
              <td style={cellStyle}>{assessment.startMetres}</td>
              <td style={cellStyle}>{assessment.endMetres}</td>
              <td style={cellStyle}>{assessment.jobId}</td>
              <td style={cellStyle}>{assessment.structureCount}</td>
              <td style={cellStyle}>{assessment.sortOrder}</td>
              <td style={cellStyle}>{assessment.assessmentId}</td>
              <td style={cellStyle}>{assessment.projectId}</td>
              <td style={cellStyle}>{assessment.companyId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentElrTable;
