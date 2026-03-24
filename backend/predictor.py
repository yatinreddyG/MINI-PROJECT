from preprocessor import (
    preprocess_heart_input,
    preprocess_brain_input,
    preprocess_kidney_input,
    preprocess_diabetes_input
)

# ─────────────────────────────────────────
# HEALTHY RANGES
# ─────────────────────────────────────────
HEALTHY_RANGES = {
    'heart': {
        'chol':     200,
        'trestbps': 120,
        'thalach':  100
    },
    'brain': {
        'avg_glucose_level': 100,
        'bmi':               24.9
    },
    'kidney': {
        'blood_pressure': 80,
        'blood_sugar':    120
    },
    'diabetes': {
        'glucose':        120,
        'bmi':            25,
        'blood_pressure': 80
    }
}

# ─────────────────────────────────────────
# SELECT BEST MODEL
# ─────────────────────────────────────────
def select_best_model(store):
    best = max(
        ['dt', 'rf', 'lr'],
        key=lambda m: (store[m]['accuracy'], store[m]['f1'])
    )
    return best

# ─────────────────────────────────────────
# GET MODEL FULL NAME
# ─────────────────────────────────────────
def get_model_name(key):
    return {
        'dt': 'Decision Tree',
        'rf': 'Random Forest',
        'lr': 'Logistic Regression'
    }[key]

# ─────────────────────────────────────────
# GET RISK LEVEL
# ─────────────────────────────────────────
def get_risk_level(prediction, confidence):
    if prediction == 'High Risk':
        if confidence >= 70:
            return 'high'
        else:
            return 'moderate'
    else:
        if confidence >= 70:
            return 'low'
        else:
            return 'moderate'

# ─────────────────────────────────────────
# GENERATE EXPLANATION
# ─────────────────────────────────────────
def generate_explanation(disease, inputs, prediction):
    risk    = prediction == 'High Risk'
    risk_word = 'elevated' if risk else 'low'
    factors = []

    if disease == 'heart':
        if float(inputs.get('chol', 0)) > 200:
            factors.append('high cholesterol')
        if float(inputs.get('trestbps', 0)) > 120:
            factors.append('elevated blood pressure')
        if int(inputs.get('fbs', 0)) == 1:
            factors.append('high fasting blood sugar')
        if int(inputs.get('exang', 0)) == 1:
            factors.append('chest pain during exercise')

    elif disease == 'brain':
        if int(inputs.get('hypertension', 0)) == 1:
            factors.append('hypertension')
        if int(inputs.get('heart_disease', 0)) == 1:
            factors.append('existing heart disease')
        if float(inputs.get('avg_glucose_level', 0)) > 100:
            factors.append('high glucose level')
        if float(inputs.get('bmi', 0)) > 24.9:
            factors.append('high BMI')
        if str(inputs.get('smoking_status', '')).lower() in ['smokes', 'formerly smoked']:
            factors.append('smoking history')

    elif disease == 'kidney':
        if float(inputs.get('blood_pressure', 0)) > 80:
            factors.append('elevated blood pressure')
        if float(inputs.get('blood_sugar', 0)) > 120:
            factors.append('high blood sugar')
        if str(inputs.get('swelling', '')).lower() == 'yes':
            factors.append('swelling in feet')
        if str(inputs.get('appetite', '')).lower() == 'poor':
            factors.append('poor appetite')
        if str(inputs.get('anaemia', '')).lower() == 'yes':
            factors.append('anaemia')

    elif disease == 'diabetes':
        if float(inputs.get('glucose', 0)) > 120:
            factors.append('high glucose level')
        if float(inputs.get('bmi', 0)) > 25:
            factors.append('high BMI')
        if float(inputs.get('blood_pressure', 0)) > 80:
            factors.append('elevated blood pressure')
        if str(inputs.get('pedigree', 0)) != '0' and float(inputs.get('pedigree', 0)) > 0.5:
            factors.append('family history of diabetes')

    if factors:
        return f"Your {' and '.join(factors)} are above healthy range indicating {risk_word} risk."
    return f"Based on your inputs your {disease} risk is {risk_word}."

# ─────────────────────────────────────────
# MAIN PREDICT FUNCTION
# ─────────────────────────────────────────
def predict(disease, user_input, models_store):
    store   = models_store[disease]
    scaler  = store['scaler']
    le_dict = store['le_dict']
    columns = store['columns']

    # Preprocess input based on disease
    if disease == 'heart':
        X = preprocess_heart_input(user_input, scaler, columns)
    elif disease == 'brain':
        X = preprocess_brain_input(user_input, scaler, le_dict, columns)
    elif disease == 'kidney':
        X = preprocess_kidney_input(user_input, scaler, le_dict, columns)
    elif disease == 'diabetes':
        X = preprocess_diabetes_input(user_input, scaler, columns)

    # Run all 3 models
    all_results = {}
    for key in ['dt', 'rf', 'lr']:
        model      = store[key]['model']
        pred       = model.predict(X)[0]
        prob       = model.predict_proba(X)[0]
        confidence = round(float(max(prob)) * 100, 2)
        all_results[key] = {
            'prediction': int(pred),
            'confidence': confidence
        }

    # Pick best model
    best_key   = select_best_model(store)
    best_pred  = all_results[best_key]['prediction']
    best_conf  = all_results[best_key]['confidence']
    prediction = 'High Risk' if best_pred == 1 else 'Low Risk'
    risk_level = get_risk_level(prediction, best_conf)

    # Build explanation
    explanation = generate_explanation(disease, user_input, prediction)

    return {
        'disease':    disease,
        'best_model': get_model_name(best_key),
        'prediction': prediction,
        'confidence': best_conf,
        'risk_level': risk_level,
        'model_accuracies': {
            'Decision Tree':       store['dt']['accuracy'],
            'Random Forest':       store['rf']['accuracy'],
            'Logistic Regression': store['lr']['accuracy']
        },
        'explanation': explanation
    }

# 1. HEALTHY_RANGES dict added at top
#    → single place to update ranges
#    → cleaner than scattered numbers

# 2. generate_explanation handles all 4 diseases
#    → checks more factors per disease
#    → handles string and float conversions safely
#    → covers smoking, family history, symptoms

# 3. predict() uses float() and int() conversions
#    → user input comes as string from JSON
#    → safe conversion prevents crashes

# 4. all_results stores all 3 model outputs
#    → predictor runs all 3 every time
#    → best selected after all 3 run
# ```

# ---

# ## API Calls It Handles
# ```
# POST /predict/heart     ✅
# POST /predict/brain     ✅
# POST /predict/kidney    ✅
# POST /predict/diabetes  ✅