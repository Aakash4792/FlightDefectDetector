import MainNavigation from "../MainNav/MainNavigation";
import Gallery from "../Gallery/Galley";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import DefectAnalysis from "../DefectAnalysis/DefectAnalysis";

import {
  Page,
  Document,
  Text,
  PDFViewer,
  Image,
  StyleSheet,
  Font,
  PDFDownloadLink,
  View,
} from "@react-pdf/renderer";
import { callProtectedAPI } from "../../utils/callProtectedAPI";

// Define your PDF styling using StyleSheet.create
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontSize: 12,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  summarySection: {
    marginTop: 20,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 11,
    padding: 5,
  },
  columnHeader: {
    backgroundColor: "#f0f0f0",
    width: "50%", // Distribute columns equally
    padding: 5,
  },
  columnHeaderText: {
    fontSize: 10,
  },
});

// const MyDoc = ({ id, date, summary, image_analysis }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>
//           Analysis ID: #{id}
//           {"   "}
//           Analysis Date: {date}
//         </Text>
//         <Text>Summary: {summary}</Text>
//         <Text>Image Analysis:</Text>
//         {image_analysis.map((image, index) => (
//           <View key={index} style={styles.imageContainer}>
//             <Text style={styles.imageFilename}>Image ID: {image.image_id}</Text>
//             <Image
//               style={styles.image}
//               src={`data:image/${image.image_link.split(".").pop()};base64,${
//                 image.data
//               }`}
//             />
//           </View>
//         ))}
//       </View>
//     </Page>
//   </Document>
// );
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
  <Document>
    {/* Page 1: Flight Info */}
    <Page size="A4" style={styles.page}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>AIRCRAFT DEFECT COMPLETE REPORT</Text>
      </View>
      <View style={styles.section}>
        <Text>Analysis ID: #{id}</Text>
        <Text>Analysis Date: {date}</Text>
        <Text>Flight Number: {flightInfo.flight_number}</Text>
        <Text>Flight Type: {flightInfo.selected_flight}</Text>
        <Text>Total Flight Hours: {flightInfo.number_input1}</Text>
        <Text>Manufacturing date: {flightInfo.selected_date}</Text>
      </View>
      <View style={styles.summarySection}>
        <Text>Summary : </Text>
      </View>
      {/* Defects Identified Summarizations Table */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Defects Identified Summarizations</Text>
        <View style={styles.tableRow}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderText}>Defect type</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderText}>Total identified</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <Text>Scratch</Text>
          <Text>15</Text>
        </View>
        <View style={styles.tableRow}>
          <Text>Paint off</Text>
          <Text>23</Text>
        </View>
        <View style={styles.tableRow}>
          <Text>Cracks</Text>
          <Text>12</Text>
        </View>
        <View style={styles.tableRow}>
          <Text>Missing Heads</Text>
          <Text>44</Text>
        </View>
        <View style={styles.tableRow}>
          <Text>Dent</Text>
          <Text>10</Text>
        </View>
      </View>

      {/* Defect Severity Tabulations Table */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Defect Severity Tabulations</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Severity code</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Severity</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Scratch</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Paint off</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Cracks</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Missing Heads</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Dent</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <Text>Code Red</Text>
            <Text>0</Text>
            <Text>3</Text>
            <Text>7</Text>
            <Text>2</Text>
            <Text>4</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Code Orange</Text>
            <Text>0</Text>
            <Text>2</Text>
            <Text>1</Text>
            <Text>15</Text>
            <Text>8</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Code Blue</Text>
            <Text>15</Text>
            <Text>12</Text>
            <Text>0</Text>
            <Text>0</Text>
            <Text>4</Text>
          </View>
        </View>
      </View>

      {/* Defect Size Tabulations Table */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Defect Size Tabulations</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Size</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Severity</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Scratch</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Paint off</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Cracks</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Missing Heads</Text>
            </View>
            <View style={styles.columnHeader}>
              <Text style={styles.columnHeaderText}>Dent</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <Text>Big</Text>
            <Text>0</Text>
            <Text>3</Text>
            <Text>7</Text>
            <Text>2</Text>
            <Text>4</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Medium</Text>
            <Text>0</Text>
            <Text>2</Text>
            <Text>1</Text>
            <Text>15</Text>
            <Text>8</Text>
          </View>
          <View style={styles.tableRow}>
            <Text>Small</Text>
            <Text>15</Text>
            <Text>12</Text>
            <Text>0</Text>
            <Text>0</Text>
            <Text>4</Text>
          </View>
        </View>
      </View>
    </Page>

    {/* Page 2: Defect Summary */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>{/* ... Render defect summary here */}</View>
    </Page>

    {/* Page 3: Defect Severity */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* ... Render defect severity here */}
      </View>
    </Page>

    {/* Page 4: Defect Size */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>{/* ... Render defect size here */}</View>
    </Page>

    {/* Page 5: Root Cause Analysis */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* ... Render root cause analysis here */}
      </View>
    </Page>

    {/* Page 6 and onward: Image Analyses */}
    {image_analysis.map((imageAnalysis, pageIndex) => (
      <Page key={pageIndex} size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* ... Render image analysis for each image */}
        </View>
      </Page>
    ))}
  </Document>
);

const Query = () => {
  const { analysisSet, getAccessTokenSilently } = useContext(AuthContext);

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
          <div>
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
          <div>
            <p>Summary : {analysis.summary}</p>
          </div>
          <div>
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
                loading ? "Loading document..." : "Generate PDF"
              }
            </PDFDownloadLink>
          </div>
        </div>
      )}
      {clicked && (
        <DefectAnalysis img={img} setClicked={setClicked} setImg={setImg} />
      )}
    </div>
  );
};

export default Query;
