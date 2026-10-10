require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
const app = express();
const PORT = process.env.PORT || 3000;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: [
    "https://iam-collins97.github.io",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
  ]
}));
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello from my server!");
});

app.post("/contact", async function (req, res) {
  console.log(req.body);
    const { name, email, phone, message } = req.body;

      const mailOptions = {
   from: "Colly Creatives <onboarding@resend.dev>",
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "New message from " + name,
    text: "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\n\nMessage:\n" + message
  };
    try {
    const { error } = await resend.emails.send(mailOptions);
if (error) {
  console.log(error);
  return res.status(500).json({ success: false });
}
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, function () {
  console.log("Server is running on port " + PORT);
});
