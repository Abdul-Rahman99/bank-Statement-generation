const PDFDocument = require("pdfkit");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Import UUID for generating unique identifiers

const ApiError = require("../utils/apiError")

const generatePDF = (transactions) => {
  return new Promise((resolve, reject) => {
    const uniqueId = uuidv4(); // Generate a unique identifier
    const pdfFileName = `transaction_statement_${uniqueId}.pdf`; // Create a unique file name

    const doc = new PDFDocument();

    // Pipe the PDF content to a writable stream
    const pdfStream = fs.createWriteStream(pdfFileName);

    doc.pipe(pdfStream);

    // Set up the PDF content
    doc.fontSize(17).text("Transaction Statement\n\n");

    transactions.forEach((transaction) => {
      doc.text(
        `Date: ${transaction.date_of_transaction}, Amount: $${transaction.amount}`
      );
    });

    // Finalize the PDF
    doc.end();

    pdfStream.on("finish", () => {
      resolve(pdfFileName); // Resolve with the unique PDF file name
    });

    pdfStream.on("error", (err) => {
      reject(new ApiError("Error reading transactions" , 500));
    });
  });
};

module.exports = { generatePDF };
