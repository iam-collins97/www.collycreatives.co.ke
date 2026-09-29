require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello from my server!");
});

app.post("/contact", async function (req, res) {
  console.log(req.body);
    const { name, email, phone, message } = req.body;

      const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "New message from " + name,
    text: "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\n\nMessage:\n" + message
  };
    try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});
