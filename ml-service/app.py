from flask import Flask, request, jsonify
import numpy as np
import yfinance as yf
import pandas as pd
import pickle
from tensorflow.keras.models import load_model
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

model = load_model("lstm_model.h5")

analyzer = SentimentIntensityAnalyzer()

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

@app.route("/")
def home():
    return "ML Service Running 🤖"

# Stock data Route
@app.route("/stock-data", methods=["POST"])
def stock_data():
    data = request.json
    stock = data.get("stock")

    df = yf.download(stock, period="1y")

    df = df.reset_index()

    df.columns = [col[0] if isinstance(col, tuple) else col for col in df.columns]

    df = df[['Date', 'Close']]
    df['Date'] = df['Date'].astype(str)

    result = df.to_dict(orient="records")

    return jsonify(result)

# Predict Route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        stock = data.get("stock")

        df = yf.download(stock, period="60d")

        close_data = df[['Close']]

        scaled_data = scaler.transform(close_data)

        last_60 = scaled_data[-60:]

        X_test = np.array([last_60])
        X_test = X_test.reshape(1, 60, 1)

        prediction = model.predict(X_test)

        predicted_price = scaler.inverse_transform(prediction)[0][0]

        return jsonify({
            "predicted_price": float(predicted_price)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/sentiment", methods=["POST"])
def sentiment():
    stock = request.json.get("stock")

    try:
        # Fetch real news
        url = f"https://newsapi.org/v2/everything?q={stock}&apiKey={os.getenv('NEWS_API_KEY')}"
        response = requests.get(url).json()

        articles = response.get("articles", [])[:5]

        if not articles:
            return jsonify({"sentiment": "Neutral", "score": 0})

        scores = []

        for article in articles:
            title = article.get("title", "")
            score = analyzer.polarity_scores(title)
            scores.append(score["compound"])

        avg_score = sum(scores) / len(scores)

        if avg_score > 0.05:
            sentiment_label = "Positive"
        elif avg_score < -0.05:
            sentiment_label = "Negative"
        else:
            sentiment_label = "Neutral"

        return jsonify({
            "sentiment": sentiment_label,
            "score": avg_score
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)