import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import Prediction from "./models/Prediction.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Prediction Route
app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/predict", {
      stock: req.body.stock,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "ML service error" });
  }
});

// Stock Data
app.post("/api/stock-data", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/stock-data", {
      stock: req.body.stock,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error fetching stock data" });
  }
});

// Save Prediction
app.post("/api/save", async (req, res) => {
  try {
    const { stock, price, sentiment } = req.body;

    const record = new Prediction({
      stock,
      price,
      sentiment,
    });

    await record.save();

    res.json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/sentiment", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/sentiment", {
      stock: req.body.stock,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Sentiment error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});