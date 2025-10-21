import React from "react";
import {
  cellStyle,
  foreignKeyStyle,
  headerStyle,
  primaryKeyStyle,
  softKeyStyle,
} from "../styles/table-styles";

const Subdivisions: React.FC = () => {
  const [data, setData] = React.useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/entry/sub-divisions"
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

  return (
    <div>
      <h2>SubDivisions</h2>
      <table>
        <thead>
          <tr>
            <th style={primaryKeyStyle}>id PK</th>
            <th style={headerStyle}>name</th>
            <th style={softKeyStyle}>code</th>
            <th style={headerStyle}>elrs</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={cellStyle}>{item.id}</td>
              <td style={cellStyle}>{item.name}</td>
              <td style={cellStyle}>{item.code}</td>
              <td style={cellStyle}>{item.elrs.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subdivisions;
