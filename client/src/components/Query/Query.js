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
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 200, // Set the width as needed
    height: 200, // Set the height as needed
  },
});

const MyDoc = ({ id, date, summary, image_analysis }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>
          Analysis ID: #{id}
          {"   "}
          Analysis Date: {date}
        </Text>
        <Text>Summary: {summary}</Text>
        <Text>Image Analysis:</Text>
        {image_analysis.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Text style={styles.imageFilename}>Image ID: {image.image_id}</Text>
            <Image
              style={styles.image}
              src={`data:image/${image.image_link.split(".").pop()};base64,${
                image.data
              }`}
            />
          </View>
        ))}
      </View>
    </Page>
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
