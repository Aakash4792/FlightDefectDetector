import MainNavigation from "../MainNav/MainNavigation";
import Gallery from "../Gallery/Galley";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import DefectAnalysis from "../DefectAnalysis/DefectAnalysis";
import PDFComponent from "../PDFComponent/PDFComponent";
import Summary from "../Summary/Summary";

import { PDFDownloadLink } from "@react-pdf/renderer";

const MyDoc = ({
  id,
  date,
  summary,
  flightInfo,
  defectSummary,
  defectSeverity,
  defectSize,
  rootCauseAnalysis,
  image_analysis,
}) => (
  <PDFComponent
    id={id}
    date={date}
    flightInfo={flightInfo}
    image_analysis={image_analysis}
    summary={summary}
  />
);

const Query = () => {
  const { analysisSet } = useContext(AuthContext);

  const params = useParams();
  const [clicked, setClicked] = useState(false);
  const [img, setImg] = useState({});
  const id = params.id;
  const analysis = analysisSet[id];
  console.log("anaylsis query : ", analysis);
  const photos = analysis.image_analysis.map((curr) => {
    return `http://localhost:4000/analyzedPhotos/${curr.image_link}`;
  });
  const date = new Date(analysis.date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const dateStr = `${day}/${month}/${year}`;
  return (
    <div>
      <MainNavigation />
      <h1>Query {params.id}</h1>
      {!clicked && (
        <div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateRows: "1fr 1fr",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "10px",
              margin: "1rem auto",
            }}
          >
            <div>Flight Number : {analysis.flightInfo.flight_number}</div>
            <div>Flight Type : {analysis.flightInfo.selected_flight}</div>
            <div>Manufacturing date : {analysis.flightInfo.selected_date}</div>
            <div>Total Flight Hours : {analysis.flightInfo.number_input1}</div>
          </div>
          <div>
            <Gallery
              photos={photos}
              setImg={setImg}
              setClicked={setClicked}
              analysis={analysis}
            ></Gallery>
          </div>
          {/* <div>
            <p>Summary : {analysis.summary}</p>
          </div> */}
          <Summary data={analysis.summary} />
          <div>
            For More Information,{" "}
            <span style={{ marginRight: "6px" }}>Please</span>
            <PDFDownloadLink
              document={
                <MyDoc
                  id={analysis.id}
                  date={dateStr}
                  summary={analysis.summary}
                  image_analysis={analysis.image_analysis}
                  flightInfo={analysis.flightInfo}
                />
              }
              fileName="report.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Generate PDF Report"
              }
            </PDFDownloadLink>
          </div>
        </div>
      )}
      {clicked && (
        <DefectAnalysis
          img={img}
          setClicked={setClicked}
          setImg={setImg}
          image_analysis={analysis.image_analysis}
        />
      )}
    </div>
  );
};

export default Query;
