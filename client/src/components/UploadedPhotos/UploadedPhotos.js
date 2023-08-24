const UploadedPhotos = ({ photos, removePhoto }) => {
  return (
    <div>
      {photos.length > 0 &&
        photos.map((link) => (
          <div key={link}>
            <img
              src={"http://localhost:4000/uploads/" + link}
              style={{ width: "100px", height: "100px" }}
            />
            <button onClick={(e) => removePhoto(e, link)}>X</button>
          </div>
        ))}
    </div>
  );
};

export default UploadedPhotos;
