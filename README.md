# MedPredict - Disease Prediction System

This is my mini project. I made a web app that predicts disease risk using machine learning. The user enters some health details and the app tells them if they are at high risk or low risk for 4 diseases.

I used Python Flask for backend and React for frontend. Three ML models run at the same time and the best one is selected automatically.

---

## What This Project Does

The user opens the website and selects a disease. Then they fill a simple form with basic health details like age, blood pressure, cholesterol etc. The system runs 3 machine learning models on the input and shows the result with charts and explanation.

The user never sees which model ran or any ML complexity. They just see High Risk or Low Risk with a plain english reason.

---

## Diseases Covered

- Heart Disease
- Brain Stroke
- Kidney Disease
- Diabetes

---

## Tech Stack

**Frontend**
- HTML, CSS
- React 18 using CDN (no npm)
- Babel Standalone for JSX compilation
- Chart.js for radar and bar charts

**Backend**
- Python 3
- Flask
- Flask-CORS
- Scikit-learn
- Pandas
- NumPy

---

## Project Structure

```
NEW MINI/
│
├── venv/                      # virtual environment (not pushed to git)
│
├── backend/
│   ├── data/
│   │   ├── heart.csv
│   │   ├── brain.csv
│   │   ├── kidney_disease.csv
│   │   └── diabetes.csv
│   ├── preprocessor.py        # cleans and encodes data
│   ├── train.py               # trains all 12 models
│   ├── predictor.py           # picks best model and returns result
│   ├── validator.py           # checks user inputs
│   └── app.py                 # main flask file
│
├── frontend/
│   ├── index.html
│   └── src/
│       ├── bundle.jsx         # all react components in one file
│       └── styles/
│           ├── global.css
│           ├── dashboard.css
│           ├── form.css
│           └── results.css
│
└── README.md
```

---

## Setup

### Step 1 - Clone the repo

```bash
git clone https://github.com/yourusername/new-mini.git
cd new-mini
```

### Step 2 - Create virtual environment

I used venv to keep all python packages separate for this project so they dont mix with other projects on my system.

```bash
python3 -m venv venv
```

### Step 3 - Activate virtual environment

```bash
# Mac or Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

After running this you will see (venv) at the start of your terminal. That means it is activated.

### Step 4 - Install required packages

```bash
cd backend
pip install flask flask-cors scikit-learn pandas numpy
```

### Step 5 - Download datasets

I got all 4 datasets from Kaggle. Download them and place inside backend/data/ folder.

| File | Kaggle Link |
|---|---|
| heart.csv | kaggle.com/datasets/cherngs/heart-disease-cleveland-uci |
| brain.csv | kaggle.com/datasets/fedesoriano/stroke-prediction-dataset |
| kidney_disease.csv | kaggle.com/datasets/mansoordaku/ckdisease |
| diabetes.csv | kaggle.com/datasets/uciml/pima-indians-diabetes-database |

After downloading rename each file as shown in the table above.

---

## How to Run

**Terminal 1 - Run the backend**

```bash
cd backend
source ../venv/bin/activate
python3 app.py
```

**Terminal 2 - Run the frontend**

I used VS Code Live Server extension to run the frontend.

```
1. Open VS Code
2. Install Live Server extension by Ritwick Dey
3. Right click on frontend/index.html
4. Select Open with Live Server
5. Browser opens at http://127.0.0.1:5500
```

---

## How It Works

```
1. User selects disease on dashboard
2. User fills health parameters in form
3. Frontend sends data to Flask API
4. Backend preprocesses inputs using saved scaler
5. All 3 models run on the input
6. Best model is picked by accuracy and F1 score
7. Result sent back as JSON
8. Frontend shows risk level, charts and explanation
```

---

## ML Models Used

I used 3 machine learning models for each disease. All 3 run every time and the best one is selected automatically. The user never sees which model was selected.

**Decision Tree**
Learns a series of if/else rules from training data. Easy to understand and explain.

**Random Forest**
Builds 100 decision trees and takes majority vote. Generally more accurate than a single tree.

**Logistic Regression**
Calculates the probability of disease using a mathematical equation. Works well for medical data.

**Best Model Selection**
1. Compare accuracy of all 3
2. Highest accuracy wins
3. If tied then F1 score is used as tiebreaker
4. If still tied then Random Forest is default

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Check if backend is running |
| POST | /predict/heart | Heart disease |
| POST | /predict/brain | Brain stroke |
| POST | /predict/kidney | Kidney disease |
| POST | /predict/diabetes | Diabetes |

**Example request for heart:**

```json
POST http://127.0.0.1:5001/predict/heart

{
  "age": 55,
  "sex": 1,
  "cp": 2,
  "trestbps": 140,
  "chol": 280,
  "fbs": 1,
  "thalach": 150,
  "exang": 1
}
```

**Example response:**

```json
{
  "disease": "heart",
  "prediction": "High Risk",
  "confidence": 75.0,
  "risk_level": "high",
  "explanation": "Your high cholesterol and elevated blood pressure are above healthy range indicating elevated risk.",
  "model_accuracies": {
    "Decision Tree": 63.33,
    "Random Forest": 65.0,
    "Logistic Regression": 58.33
  }
}
```

---

## Model Results

| Disease | Decision Tree | Random Forest | Logistic Regression | Winner |
|---|---|---|---|---|
| Heart | 63.33% | 65.00% | 58.33% | Random Forest |
| Brain | 92.07% | 93.84% | 75.05% | Random Forest |
| Kidney | 88.75% | 91.25% | 93.75% | Logistic Regression |
| Diabetes | 75.32% | 75.32% | 69.48% | Random Forest |

Heart disease accuracy is on the lower side because the dataset only has 303 rows. ML models need more data to learn better patterns. For a mini project this is acceptable and can be mentioned in viva.

---

## Why bundle.jsx Instead of Separate Files

I initially wrote all React components in separate JSX files. But when loading multiple JSX files via CDN script tags the browser loads them all at the same time as parallel requests. This causes a race condition where App.jsx tries to use components that are not loaded yet resulting in a blank page.

To fix this I combined all JSX into one single bundle.jsx file in the correct order. This way everything loads top to bottom with no timing issues.

In production this would be handled by a build tool like Vite or Webpack. Since we are using plain CDN without any build tools we manually bundled the files.

---

## Why Babel is Used

Browsers cannot understand JSX syntax directly. Babel is a JavaScript compiler that converts JSX into plain JavaScript that the browser can run.

We used Babel Standalone which is a browser version of Babel that compiles JSX at runtime directly in the browser. No build step or npm needed.

---


This project is made for academic and educational purposes only. The predictions shown are not real medical diagnoses. Please consult a qualified doctor for actual medical advice.

---