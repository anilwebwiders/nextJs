import React from "react";
import ReactPlayer from "react-player";

const ShowFiles = ({ i }) => {
  console.log(i);

  return (
    <div className="my-2">
      {" "}
      <div>
        {/* <iframe width="420" height="315" src='https://www.youtube.com/embed/tgbNymZ7vqY'></iframe> */}
        <div style={{ position: "relative" }}>
          <ReactPlayer
            url={i}
            className="react-player"
            height="480px"
          />
        </div>
      </div>
    </div>
  );
};

export default ShowFiles;
