import { useState } from "react";
import {
  getStockData,
  getPrediction,
  getSentiment,
  savePrediction,
} from "./services/api";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [stock, setStock] = useState();
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setData([]);
    setPrediction(null);
    setSentiment(null);

    try {
      const [stockData, pred, sent] = await Promise.all([
        getStockData(stock),
        getPrediction(stock),
        getSentiment(stock),
      ]);

      if (!Array.isArray(stockData) || stockData.length === 0) {
        throw new Error("No stock data found");
      }

      setData(stockData);

      const predictedValue = pred?.predicted_price;
      if (predictedValue && !isNaN(predictedValue)) {
        setPrediction(predictedValue);
      }

      if (sent && sent.sentiment) {
        setSentiment(sent);
      }

      if (predictedValue && sent?.sentiment) {
        await savePrediction({
          stock,
          price: predictedValue,
          sentiment: sent.sentiment,
        });
      }
    } catch (err) {
      console.error(err);
      setError("❌ Invalid stock or API issue. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      
      {/* HEADER */}
      <h1 className="text-5xl font-bold mb-8 tracking-wide text-center">
        🏛️AI Stock Price Prediction
      </h1>

      {/* SEARCH BAR */}
      <div className="flex gap-4 mb-8">
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value.toUpperCase())}
          className="px-4 py-3 w-64 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter Stock (AAPL)"
        />

        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-600 p-4 rounded-xl mb-6 shadow">
          {error}
        </div>
      )}

      {/* GRID CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* PRICE CARD */}
        {prediction && (
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800 hover:scale-105 transition">
            <h2 className="text-gray-400 mb-2">Predicted Price</h2>
            <p className="text-3xl font-bold text-green-400">
              ${Number(prediction).toFixed(2)}
            </p>
          </div>
        )}

        {/* SENTIMENT */}
        {sentiment && (
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800 hover:scale-105 transition">
            <h2 className="text-gray-400 mb-2">Market Sentiment</h2>
            <p className="text-2xl font-semibold">
              {sentiment.sentiment} (
              {Number(sentiment.score).toFixed(2)})
            </p>
          </div>
        )}

        {/* RECOMMENDATION */}
        {prediction && sentiment && (
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800 hover:scale-105 transition">
            <h2 className="text-gray-400 mb-2">Recommendation</h2>
            <p className="text-2xl font-bold">
              {sentiment.sentiment === "Positive" ? (
                <span className="text-green-400">BUY 📈</span>
              ) : sentiment.sentiment === "Negative" ? (
                <span className="text-red-400">SELL 📉</span>
              ) : (
                <span className="text-yellow-400">HOLD ⚖️</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* CHART */}
      {Array.isArray(data) && data.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800">
          <h2 className="text-xl mb-4 text-gray-300">
            📈 Price Movement
          </h2>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="Date" hide />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="Close"
                stroke="#00ffcc"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default App;