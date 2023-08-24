import React, { useState } from "react";
import UploadedPhotos from "../UploadedPhotos/UploadedPhotos";
import { callProtectedAPI } from "../../utils/callProtectedAPI";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./InputForm.module.css";
import axios from "axios";

const InputForm = () => {
  const navigate = useNavigate();

  const { getAccessTokenSilently, setAnalysisSet } = useContext(AuthContext);

  const [selectedFlight, setSelectedFlight] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [numberInput1, setNumberInput1] = useState(0);
  const [numberInput2, setNumberInput2] = useState(0);

  const handleFlightChange = (event) => {
    console.log(event.target.value);
    setSelectedFlight(event.target.value);
  };

  const handleDateChange = (event) => {
    console.log(event.target.value);
    setSelectedDate(event.target.value);
  };

  const handleNumberInput1Change = (event) => {
    console.log(event.target.value);
    setNumberInput1(event.target.value);
  };

  const handleNumberInput2Change = (event) => {
    console.log(event.target.value);
    setNumberInput2(event.target.value);
  };

  const afterPostUpload = (response) => {
    const { data: filenames } = response;
    console.log(filenames);
    setSelectedPhotos((prev) => [...prev, ...filenames]);
  };

  function removePhoto(e, filename) {
    e.preventDefault();
    setSelectedPhotos([
      ...selectedPhotos.filter((photo) => photo !== filename),
    ]);
  }

  async function uploadPhoto(e) {
    console.log("uploadPhoto called");
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    console.log(data);
    await callProtectedAPI(
      getAccessTokenSilently,
      "POST",
      "/upload",
      data,
      {
        "Content-Type": "multipart/form-data",
      },
      afterPostUpload
    );
  }

  const validateForm = () => {
    // Implement your validation logic here
    if (!selectedFlight) {
      alert("Please select a flight.");
      return false;
    }

    if (selectedPhotos.length === 0) {
      alert("Please upload at least one photo.");
      return false;
    }

    if (!selectedDate) {
      alert("Please select a manufacturing date.");
      return false;
    }

    if (numberInput1 <= 0 || numberInput2 <= 0) {
      alert("Hours of flight and miles travelled must be greater than 0.");
      return false;
    }

    return true;
  };

  const afterPostAnalyze = (response) => {
    console.log("response for input form: ", response.data);
    setAnalysisSet((prev) => [...prev, response.data.analysis]);
    navigate(`/history/${response.data.analysis.id}`);
  };

  const afterBulkPostAnalyze = (response) => {
    console.log("response for input form: ", response.data);
    setAnalysisSet((prev) => [...prev, response.data.analysis]);
  };

  const analyze = async () => {
    if (validateForm()) {
      if (selectedPhotos.length < 3) {
        const requestData = {
          flight: selectedFlight,
          photos: selectedPhotos,
          manufacturingDate: selectedDate,
          hoursOfFlight: numberInput1,
          milesTravelled: numberInput2,
        };
        await callProtectedAPI(
          getAccessTokenSilently,
          "POST",
          "/analysis",
          requestData,
          {},
          afterPostAnalyze
        );
      } else {
        //send mail and alert user
        const requestData = {
          flight: selectedFlight,
          photos: selectedPhotos,
          manufacturingDate: selectedDate,
          hoursOfFlight: numberInput1,
          milesTravelled: numberInput2,
        };
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: `MyExpressAPI`,
            scope: "openid profile email",
          },
        });
        axios
          .post("/bulkAnalysis", requestData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("resp : ", response);
            afterBulkPostAnalyze(response);
          });
        alert(
          "Please check your mail for the detailed report in some time...It might take some time for the report to become avaiable in your history"
        );
        navigate(`/homepage`);
      }
    }
  };

  return (
    <div className={classes.formDiv}>
      <h2>Enter details</h2>
      <div>
        <label>Select Flight:</label>
        <select value={selectedFlight} onChange={handleFlightChange}>
          <option value="">Select a flight</option>
          <option value="Flight A">Flight A</option>
          <option value="Flight B">Flight B</option>
          <option value="Flight C">Flight C</option>
        </select>
      </div>
      <div>
        <div>
          <label htmlFor="file-input">Upload Photos</label>
          <input
            type="file"
            id="file-input"
            name="file-input"
            className={classes.fileInput}
            multiple
            onChange={uploadPhoto}
            accept="image/*"
          />
        </div>

        <UploadedPhotos photos={selectedPhotos} removePhoto={removePhoto} />
      </div>
      <div>
        <label>Manufacturing Date:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      <div>
        <label>Hours of Flight:</label>
        <input
          type="number"
          value={numberInput1}
          onChange={handleNumberInput1Change}
        />
      </div>
      <div>
        <label>Miles Travelled:</label>
        <input
          type="number"
          value={numberInput2}
          onChange={handleNumberInput2Change}
        />
      </div>
      <div>
        <button onClick={analyze}>Analyze</button>
      </div>
    </div>
  );
};

export default InputForm;
