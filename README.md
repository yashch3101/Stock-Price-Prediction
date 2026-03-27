# AI Stock Price Prediction System

## Overview

This project is a full-stack AI-powered stock price prediction system
that provides real-time stock data, future price predictions using a
machine learning model, and sentiment analysis based on news data. The
system is designed to simulate a real-world trading analytics platform.

It integrates a machine learning model (LSTM), a backend API layer, and
a modern frontend dashboard to deliver a complete end-to-end solution.

------------------------------------------------------------------------

## Features

-   Real-time stock data fetching using Yahoo Finance
-   Stock price prediction using LSTM (Long Short-Term Memory)
-   News-based sentiment analysis
-   Buy / Sell / Hold recommendation system
-   Interactive stock price visualization
-   MongoDB integration for storing predictions
-   Full-stack architecture (React + Node.js + Flask)
-   Error handling and input validation

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React (Vite)
-   Tailwind CSS
-   Recharts

### Backend

-   Node.js
-   Express.js
-   Axios

### Machine Learning Service

-   Python
-   Flask
-   TensorFlow / Keras (LSTM model)
-   Scikit-learn (MinMaxScaler)
-   yfinance
-   vaderSentiment

### Database

-   MongoDB (Mongoose)

------------------------------------------------------------------------

## Project Architecture

Frontend (React)\
→ Node.js Backend (API Layer)\
→ Flask ML Service (Prediction + Sentiment)\
→ External APIs (Yahoo Finance, News API)\
→ MongoDB (Storage)

------------------------------------------------------------------------

## How It Works

1.  User enters a stock ticker (e.g., AAPL, TSLA)
2.  Frontend sends request to Node.js backend
3.  Backend forwards request to Flask ML service
4.  ML service:
    -   Fetches stock data from Yahoo Finance
    -   Predicts next price using LSTM model
    -   Performs sentiment analysis on news
5.  Backend stores prediction in MongoDB
6.  Frontend displays:
    -   Historical price chart
    -   Predicted price
    -   Sentiment score
    -   Recommendation (Buy / Sell / Hold)

------------------------------------------------------------------------

## Installation and Setup

### Prerequisites

-   Node.js
-   Python 3.x
-   MongoDB
-   npm / pip

------------------------------------------------------------------------

### 1. Clone Repository

git clone https://github.com/your-username/stock-price-prediction.git\
cd stock-price-prediction

------------------------------------------------------------------------

### 2. Setup Backend (Node.js)

cd backend\
npm install

Create .env file:

PORT=5000\
MONGO_URI=your_mongodb_connection_string

Run backend:

npm run dev

------------------------------------------------------------------------

### 3. Setup ML Service (Flask)

cd ml-service\
python -m venv venv\
venv`\Scripts`{=tex}`\activate  `{=tex}

pip install flask pandas numpy scikit-learn tensorflow yfinance
vaderSentiment requests python-dotenv

Create .env file:

NEWS_API_KEY=your_news_api_key

Run ML service:

python app.py

------------------------------------------------------------------------

### 4. Setup Frontend (React)

cd frontend\
npm install\
npm run dev

------------------------------------------------------------------------

## API Endpoints

### Backend (Node.js)

-   POST /api/stock-data → Fetch stock historical data\
-   POST /api/predict → Get predicted stock price\
-   POST /api/sentiment → Get sentiment analysis\
-   POST /api/save → Save prediction to database

------------------------------------------------------------------------

### ML Service (Flask)

-   POST /stock-data → Fetch stock data\
-   POST /predict → Predict stock price\
-   POST /sentiment → Analyze sentiment

------------------------------------------------------------------------

## Machine Learning Model

-   Model Type: LSTM (Recurrent Neural Network)
-   Input: Last 60 days of closing prices
-   Output: Predicted next stock price
-   Preprocessing:
    -   MinMaxScaler normalization
-   Training:
    -   Time-series sequential data

------------------------------------------------------------------------

## Sentiment Analysis

-   Uses VADER Sentiment Analyzer
-   Fetches real-time news headlines via News API
-   Calculates compound sentiment score
-   Classifies sentiment into:
    -   Positive
    -   Negative
    -   Neutral

------------------------------------------------------------------------

## Database Schema

Prediction Model:

{ stock: String, price: Number, sentiment: String, date: Date }

------------------------------------------------------------------------

## Error Handling

-   Handles invalid stock ticker inputs
-   Prevents frontend crashes with safe rendering
-   API error handling with fallback responses
-   Sentiment API failure isolation

------------------------------------------------------------------------

## Limitations

-   Prediction is based only on historical data
-   Does not include macroeconomic or financial indicators
-   News API may have rate limits
-   Not intended for real financial decision-making

------------------------------------------------------------------------

## Future Improvements

-   Real-time WebSocket updates
-   Advanced models (Transformer, Prophet)
-   Portfolio tracking system
-   User authentication
-   Multi-stock comparison dashboard
-   Deployment on cloud platforms

------------------------------------------------------------------------

## Author

This project demonstrates full-stack development with machine learning
integration, including data processing, model inference, API design, and
frontend visualization.

------------------------------------------------------------------------

## License

This project is created for educational and demonstration purposes.
