from flask import Flask, request, jsonify
from flask_cors import CORS
from train import train_all_models
from predictor import predict
from validator import validate

app = Flask(__name__)
CORS(app)

print("\n🚀 Starting NEW MINI Backend...")
models_store = train_all_models()
print("✅ Backend Ready\n")

def handle_predict(disease):
    try:
        data  = request.get_json()
        error = validate(disease, data)
        if error:
            return jsonify({"error": error}), 400
        return jsonify(predict(disease, data, models_store)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "running", "models": "ready"}), 200

@app.route('/predict/heart',    methods=['POST'])
def predict_heart():
    return handle_predict('heart')

@app.route('/predict/brain',    methods=['POST'])
def predict_brain():
    return handle_predict('brain')

@app.route('/predict/kidney',   methods=['POST'])
def predict_kidney():
    return handle_predict('kidney')

@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    return handle_predict('diabetes')

if __name__ == '__main__':
    app.run(debug=False, port=5001)
# ```

# ---

# ## What Changed
# ```
# Before → 4 routes each with same try/except block
# After  → one handle_predict() function
#          all 4 routes call it with disease name
#          cleaner, less code, same result