import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const Connect: React.FC = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state: RootState) => state);
  const clearName = () => {
    dispatch({ type: "SET_USER_NAME", payload: null });
  };

  const setApiConnected = (connected: boolean) => {
    dispatch({ type: "SET_CONNECTED", payload: connected });
  };

  const callAPI = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/entry/connect");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      setApiConnected(data?.connected);
    } catch (error) {
      console.error("Error connecting to API:", error);
    }
  };

  return (
    <div>
      <p data-qa="hello">
        Hello {userName} <button onClick={clearName}>I'm not {userName}</button>
      </p>
      <button data-qa="connectBtn" onClick={callAPI}>
        Connect To API
      </button>
    </div>
  );
};

export default Connect;
