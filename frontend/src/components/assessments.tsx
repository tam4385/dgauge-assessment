import React from "react";
import { cellStyle, primaryKeyStyle } from "../styles/table-styles";

const AssessmentTable: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/entry/assessments"
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

  const resultsLink = (assessmentId: number, projectId: number) => {
    return `/results/project/${projectId}/assessment/${assessmentId}`;
  };

  return (
    <div>
      <h2>Assessments</h2>
      <table>
        <thead>
          <tr>
            <th style={{ ...primaryKeyStyle, fontWeight: "bold" }}>
              assessmentId PK
            </th>
            <th style={{ ...cellStyle, fontWeight: "bold" }}>projectId</th>
            <th style={{ ...cellStyle, fontWeight: "bold" }}>reference</th>
            <th style={{ ...cellStyle, fontWeight: "bold" }}>
              numberOfVehicles
            </th>
            <th style={{ ...cellStyle, fontWeight: "bold" }}>
              assessmentStatusId
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((assessment, index) => (
            <tr key={index}>
              <td style={cellStyle}>
                <a
                  href={resultsLink(
                    assessment.assessmentId,
                    assessment.projectId
                  )}
                >
                  {assessment.assessmentId}
                </a>
              </td>
              <td style={cellStyle}>{assessment.projectId}</td>
              <td style={cellStyle}>{assessment.reference}</td>
              <td style={cellStyle}>{assessment.numberOfVehicles}</td>
              <td style={cellStyle}>{assessment.assessmentStatusId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssessmentTable;
