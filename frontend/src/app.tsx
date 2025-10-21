import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import Hello from "./components/hello";
import Connect from "./components/connect";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { userName, apiConnected } = useSelector((state: RootState) => state);

  const clearState = () => {
    console.log("reset");
    dispatch({ type: "RESET" });
  };

  const NotConnected = !userName ? <Hello /> : <Connect />;
  const connected = (
    <>
      <p data-qa="devReady">
        You're good to go..
        <a data-qa="dbLink" href="/database-tables">
          View Database Tables
        </a>
      </p>
    </>
  );

  return (
    <>
      {apiConnected ? connected : NotConnected}
      <button data-qa="resetBtn" onClick={clearState}>
        Restart
      </button>
    </>
  );
};

export default App;
