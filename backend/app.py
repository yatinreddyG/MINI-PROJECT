from flask import Flask, request, jsonify
from flask_cors import CORS
from train import train_all_models
from predictor import predict
from validator import validate
import os

app = Flask(__name__)
CORS(app)

print("\n🚀 Starting NEW MINI Backend...")

# Lazy loading of models
models_store = None

def get_models():
    global models_store
    if models_store is None:
        print("⏳ Training models...")
        models_store = train_all_models()
        print("✅ Models ready")
    return models_store

print("✅ Backend Ready\n")


def handle_predict(disease):
    try:
        data = request.get_json()

        # Validate input
        error = validate(disease, data)
        if error:
            return jsonify({"error": error}), 400

        # ✅ Use lazy-loaded models
        result = predict(disease, data, get_models())

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Health check route
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "running",
        "models": "lazy-loaded"
    }), 200


# Prediction routes
@app.route('/predict/heart', methods=['POST'])
def predict_heart():
    return handle_predict('heart')


@app.route('/predict/brain', methods=['POST'])
def predict_brain():
    return handle_predict('brain')


@app.route('/predict/kidney', methods=['POST'])
def predict_kidney():
    return handle_predict('kidney')


@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    return handle_predict('diabetes')


# Render-compatible run
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)