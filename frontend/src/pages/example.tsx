import React from "react";
import { cellStyle, headerStyle } from "../styles/table-styles";

const Example: React.FC = () => {
  const viewTables = () => {
    window.location.href = "/database-tables";
  };

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
        <h2>Clearance by Sub-Division, Milepost & Track (3)</h2>
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
            <tr>
              <td style={headerStyle} colSpan={6}>
                A&WP-XXB
              </td>
            </tr>
            <tr>
              <th style={cellStyle}></th>
              <th style={cellStyle}>17.90mi 0 171.84mi</th>
              <th style={cellStyle}>SD</th>
              <th style={cellStyle}>6</th>
              <th style={cellStyle}>Clear</th>
              <th style={cellStyle}>0</th>
            </tr>
            <tr>
              <th style={cellStyle}></th>
              <th style={cellStyle}>17.90mi 0 171.84mi</th>
              <th style={cellStyle}>SD</th>
              <th style={cellStyle}>165</th>
              <th style={cellStyle}>Prohibit</th>
              <th style={cellStyle}>26</th>
            </tr>
            <tr>
              <td style={headerStyle} colSpan={6}>
                Abbeville - SG
              </td>
            </tr>
            <tr>
              <th style={cellStyle}></th>
              <th style={cellStyle}>443.04mi - 300.00mi</th>
              <th style={cellStyle}>ALL</th>
              <th style={cellStyle}>0</th>
              <th style={cellStyle}>Clear</th>
              <th style={cellStyle}>0</th>
            </tr>
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

export default Example;
