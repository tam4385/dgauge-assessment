import React from "react";
import { cellStyle, headerStyle } from "../styles/table-styles";
import { useParams } from "react-router-dom";

const Results: React.FC = () => {
  const { pid: project, aid: assessment }: any = useParams();

  const viewTables = () => {
    window.location.href = "/database-tables";
  };

  const [results, setResults] = React.useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/entry/results?projectId=" +
          project +
          "&assessmentId=" +
          assessment
      );

      const data = await response.json();
      console.log({ data });
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const groupRow = (data: any, index: number) => {
    console.log(`Group row ${index}:`, data);
    return (
      <tr key={index}>
        <td data-qa={`subdivision${index}`} style={headerStyle} colSpan={6}>
          {data.subDivision}
        </td>
      </tr>
    );
  };

  const lineRow = (data: any, index: number) => {
    if (data.type === "data") {
      console.log(`Data row ${index}:`, data.mileageRange);
    }
    return (
      <tr key={index}>
        <td style={cellStyle}></td>
        <td data-qa={`mileage${index}`} style={cellStyle}>
          {data.mileageRange.from}mi - {data.mileageRange.to}mi
        </td>
        <td data-qa={`trackCode${index}`} style={cellStyle}>
          {data.trackCode}
        </td>
        <td data-qa={`structures${index}`} style={cellStyle}>
          {data.structures}
        </td>
        <td data-qa={`clearanceCategory${index}`} style={cellStyle}>
          {data.clearanceCategory}
        </td>
        <td data-qa={`prohibited${index}`} style={cellStyle}>
          {data.prohibited}
        </td>
      </tr>
    );
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "100px" }}>
      <div
        style={{
          width: "60%",
          margin: "auto",
          float: "left",
          border: "1px solid black",
          minHeight: "400px",
          padding: "10px",
        }}
      >
        <h2>Results Clearance by Sub-Division, Milepost & Track (3)</h2>
        <table>
          <thead>
            <tr>
              <th style={headerStyle}></th>
              <th style={headerStyle}>Mileage Range</th>
              <th style={headerStyle}>Track Code</th>
              <th style={headerStyle}>Structures</th>
              <th style={headerStyle}>Category</th>
              <th style={headerStyle}>Prohibits</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) =>
              row.type === "group" ? groupRow(row, index) : lineRow(row, index)
            )}
          </tbody>
        </table>
      </div>
      <div
        style={{
          width: "30%",
          margin: "auto",
          float: "left",
          border: "1px solid black",
          minHeight: "400px",
          padding: "10px",
        }}
      >
        <h2>Assessment Details</h2>
        <p>Project: {project}</p>
        <p>Assessment: {assessment}</p>
        <p>Structure Clearance Results (PR11495A08)</p>
        <p>171 Structures, 2 Mileposts</p>
        <p>86 foot Auto - Cargo Train</p>
      </div>
      <div style={{ clear: "both", paddingTop: "20px" }}>
        <button onClick={viewTables}>Go Back</button>
      </div>
    </div>
  );
};

export default Results;
