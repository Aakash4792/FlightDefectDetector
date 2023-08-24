const Gallery = ({ photos, setImg, setClicked, analysis }) => {
  const handleClick = (link, idx) => {
    console.log(link, " clicked");
    setClicked(true);
    setImg({ link, ...analysis.image_analysis[idx] });
  };
  return (
    <div>
      {photos.length > 0 &&
        photos.map((link, idx) => (
          <img
            src={link}
            style={{ width: "200px", height: "200px", cursor: "pointer" }}
            key={link}
            onClick={() => handleClick(link, idx)}
          />
        ))}
    </div>
  );
};

export default Gallery;
