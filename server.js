// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { EmailService } = require("./src/emailService");

const app = express();
const emailService = new EmailService();

// Cors
app.use(cors());

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to send email
app.post("/send-email", async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res
      .status(400)
      .json({ error: "Missing required fields: to, subject, body" });
  }

  try {
    const result = await emailService.sendEmail(to, subject, body);
    console.log(result);
    if (result) {
      return res
        .status(200)
        .json({ message: "Email sent successfully", result });
    } else {
      return res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while sending email",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
