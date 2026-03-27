import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  stock: String,
  price: Number,
  sentiment: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;