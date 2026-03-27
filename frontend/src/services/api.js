import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getStockData = async (stock) => {
  const res = await axios.post(`${BASE_URL}/stock-data`, { stock });
  return res.data;
};

export const getPrediction = async (stock) => {
  const res = await axios.post(`${BASE_URL}/predict`, { stock });
  return res.data;
};

export const getSentiment = async (stock) => {
  const res = await axios.post(`${BASE_URL}/sentiment`, { stock });
  return res.data;
};

export const savePrediction = async (data) => {
  await axios.post(`${BASE_URL}/save`, data);
};