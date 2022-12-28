import React from "react";
import { BiLowVision } from "react-icons/bi";
const Nothing = () => {
  return (
    <div className="p-5 text-center">
      <h1 style={{ fontSize: "5rem" }} className="text-warning">
        <BiLowVision/>
      </h1>
      <h3 style={{ fontSize: "2rem" }} className="text-warning">
       Nothing to Show
      </h3>
    </div>
  );
};

export default Nothing;
