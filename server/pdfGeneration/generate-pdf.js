const PDFDocument = require("pdfkit");
const fs = require("fs");

async function generatePDF(email, data) {
  console.log("email and data : ", email, data);
  const doc = new PDFDocument();
  const filename = `generated-pdf-${email}-${data.id}.pdf`;

  // Pipe the PDF document to a file
  const filePath = `./analyzedPDFs/${filename}`;
  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Add content to the PDF
  doc.fontSize(14).text(`Analysis ID: ${data.id}`);
  const date = new Date(data.date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  doc.fontSize(14).text(`Analysis Date: ${day}/${month}/${year}`);
  doc.fontSize(14).text(`Summary: ${data.summary}`);

  for (const image of data.image_analysis) {
    // Embed image in the PDF
    const imgPath = `./analyzedPhotos/${image.image_link}`;
    doc.image(imgPath, {
      fit: [400, 300], // Set the size of the image in the PDF
      align: "center", // Align the image in the center
    });

    for (const defect of image.defects) {
      doc.fontSize(12).text(`Defect Name: ${defect.defectName}`);
      doc.fontSize(12).text(`Defect Content: ${defect.defectContent}`);
    }
  }

  doc.end();
  await new Promise((resolve) => writeStream.on("finish", resolve));
  return { filename, filePath };
}

module.exports = generatePDF;
