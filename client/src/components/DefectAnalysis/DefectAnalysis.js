import tableData from "../../store/tableData.js";
import { useState, useEffect } from "react";
import classes from "./DefectAnalysis.module.css";
const DefectAnalysis = ({ img, setClicked, setImg }) => {
  console.log("img : ", img);

  //img.defects;
  const defects = img.defects;

  console.log("defects : ", defects);
  console.log(classes);

  const [hoveredDefect, setHoveredDefect] = useState(null);

  const handleRectangleHover = (event, defect) => {
    setHoveredDefect(defect);
  };

  // const handleMouseLeave = (event, defect) => {
  //   setHoveredDefect(null);
  // };

  return (
    <div className={classes.popupWrapper}>
      <button
        onClick={() => {
          setClicked(false);
          setImg({});
        }}
      >
        X
      </button>
      <div
        className={classes.container}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div
          className={classes.imageContainer}
          style={{
            width: "50%",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={`data:image/${
              img.filename.split(".")[img.filename.split(".").length - 1]
            };base64,${img.data}`}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
          {defects.map((defect, index) => (
            <div
              key={index}
              className="rectangle"
              style={{
                position: "absolute",
                top: defect.coords[0],
                left: defect.coords[1],
                width: defect.coords[2],
                height: defect.coords[3],
                border: "2px solid red",
              }}
              onMouseEnter={(e) => handleRectangleHover(e, defect)}
              // onMouseLeave={(e) => handleMouseLeave(e, defect)}
            ></div>
          ))}
        </div>
        <div className={classes.text} style={{ width: "50%" }}>
          <h4>
            Hover over the rectangle(s) to know more about the defects
            identified.
          </h4>
          {hoveredDefect && (
            <div>
              <h1>Type : {tableData[hoveredDefect.type].name}</h1>
              <p>Severity : {hoveredDefect.severity}</p>
              <p>Size : {hoveredDefect.size}</p>
              <p>Causes : {tableData[hoveredDefect.type].causes}</p>
              <p>Affects : {tableData[hoveredDefect.type].affects}</p>
              <p>Solutions : {tableData[hoveredDefect.type].solutions}</p>
              <p>Preventions : {tableData[hoveredDefect.type].preventions}</p>
            </div>
          )}
          {/* <h1>Defect Name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            vitae aperiam nam enim voluptatum facilis, alias sit cupiditate
            pariatur veniam minus quis eveniet inventore eligendi corrupti dicta
            necessitatibus consectetur optio accusantium nihil similique sint
            nesciunt? Possimus ratione quam modi nobis enim accusamus nemo
            eligendi explicabo mollitia culpa, deleniti magnam laboriosam at
            veritatis quisquam illum consequatur incidunt aliquid cupiditate,
            maiores eos maxime! Voluptas officiis deserunt nam facere debitis
            tempore, sed est iste enim incidunt itaque, illum atque magnam
            cumque. Exercitationem voluptates minus ducimus tempore. Distinctio
            nulla quidem doloribus quod doloremque laboriosam, impedit, tempora
            rerum quos, a repellendus iure sequi sapiente veritatis?
            {originalWidth && originalHeight && (
              <p>
                Original Dimensions: {originalWidth} x {originalHeight}
              </p>
            )}
            {resizedWidth && resizedHeight && (
              <p>
                Resized Dimensions: {resizedWidth} x {resizedHeight}
              </p>
            )}
            {hoveredInfo && (
              <div className="hovered-info">
                <p>{hoveredInfo}</p>
                <p>Cause: {hoveredCause}</p>
              </div>
            )}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default DefectAnalysis;
