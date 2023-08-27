import tableData from "../../store/tableData";
const Summary = ({ data }) => {
  return (
    <div>
      <p>Total Images uploaded : {data.total_images_uploaded}</p>
      <p>Total Defects Identified : {data.total_defects}</p>
      <p>
        Identified defect tags :{" "}
        {data.identified_defect_tags.map((tag) => tag + " ")}
      </p>
    </div>
  );
};

export default Summary;
