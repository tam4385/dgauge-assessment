import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Hello: React.FC = () => {
  const dispatch = useDispatch();

  const StoreName = (nameToStore: string) => {
    dispatch({ type: "SET_USER_NAME", payload: nameToStore });
  };

  const [name, setName] = useState<string>("Enter Name");

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Who Are you?</h1>
      <input
        data-qa="nameInput"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button data-qa={"storeNameBtn"} onClick={() => StoreName(name)}>
        Store Name
      </button>
    </div>
  );
};

export default Hello;
