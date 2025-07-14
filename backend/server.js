import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎉 Backend is running. Email endpoint: POST /send-confirmation");
});

// ✅ NEW ROUTE the frontend expects
app.post("/log-lease", async (req, res) => {
  const { to, subject, html, tenant, address, priceUSD, priceETH, date, wallet } = req.body;

  console.log("📝 New Lease Logged:", {
    tenant, address, priceUSD, priceETH, date, wallet,
  });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DecentraRent" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    res.status(500).json({ message: "Email send failed", error });
  }
});

// ✅ Listen on port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});