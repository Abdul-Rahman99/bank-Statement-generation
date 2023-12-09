const express = require("express");
const router = express.Router();

const dbService = require("../database/db");
const pdfGenerator = require("../services/pdfGenerator");
const emailSender = require("../services/emailSender");
const inputValidator = require("../utils/validators/inputValidator"); // Import the validator module


router.post("/generate-statement", async (req, res) => {
  try {
    const { fromDate, toDate, userEmail } = req.body;

    // Validate date input using the imported validator module
    const dateValidation = inputValidator.validateDateInput(fromDate, toDate);
    if (!dateValidation.isValid) {
      return res.status(400).json({ error: dateValidation.error });
    }

    // Retrieve transactions from the database
    const transactions = await dbService.getTransactions(
      userEmail,
      fromDate,
      toDate
    );

    // Check if transactions exist
    if (transactions.length === 0) {
      return res
        .status(404)
        .json({
          error:
            "No transactions found for the provided date range and user email.",
        });
    }

    // Generate PDF
    const pdfFileName = await pdfGenerator.generatePDF(transactions);

    // Send email with PDF attached
    const emailResult = await emailSender.sendEmail(userEmail, pdfFileName);

    res.status(200).json({ message: emailResult });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error generating statement and sending email" });
  }
});

module.exports = router;
