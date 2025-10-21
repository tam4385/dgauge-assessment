import React from "react";
import {
  cellStyle,
  foreignKeyStyle,
  headerStyle,
  primaryKeyStyle,
} from "../styles/table-styles";

const ResultsTable: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/entry/job-results"
      );

      const data = await response.json();
      setData(data);
      console.log({data})
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Job Results</h2>
      <table>
        <thead>
          <tr>
            <th style={primaryKeyStyle}>id PK</th>
            <th style={foreignKeyStyle}>jobId</th>
            <th style={headerStyle}>trackCode</th>
            <th style={headerStyle}>count</th>
            <th style={headerStyle}>category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={cellStyle}>{item.id}</td>
              <td style={cellStyle}>{item.jobId}</td>
              <td style={cellStyle}>{item.trackCode}</td>
              <td style={cellStyle}>{item.count}</td>
              <td style={cellStyle}>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
