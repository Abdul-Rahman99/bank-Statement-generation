const nodemailer = require("nodemailer");

const sendEmail = (userEmail, pdfFileName) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a Nodemailer transporter using SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email service
        auth: {
          user: process.env.SMTP_EMAIL, // Sender's email address
          pass: process.env.SMTP_PASSWORD, // Sender's email password or App Password for Gmail
        },
      });

      const mailOptions = {
        from: "your-email@gmail.com", // Sender address
        to: userEmail, // Recipient address
        subject: "Your Transaction Statement", // Subject line
        text: "Please find your transaction statement attached.", // Plain text body
        attachments: [{ filename: pdfFileName, path: `./${pdfFileName}` }], // Attach the PDF
      };

      // Send email with attached PDF
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      resolve("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      reject("Error sending email");
    }
  });
};

module.exports = { sendEmail };
