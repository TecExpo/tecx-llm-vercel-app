from flask import Flask, request, jsonify
import os
import numpy as np
import onnxruntime as ort

app = Flask(__name__)

# Resolve path to the lightweight ONNX model file
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.onnx")

# Load ONNX session (This consumes almost no memory/bundle size)
try:
    if os.path.exists(MODEL_PATH):
        session = ort.InferenceSession(MODEL_PATH)
    else:
        session = None
except Exception as e:
    print(f"Error loading ONNX model: {e}")
    session = None

@app.route("/api/generate", methods=["POST"])
def generate_text():
    data = request.json or {}
    user_prompt = data.get("prompt", "")
    
    if not user_prompt:
        return jsonify({"error": "Prompt cannot be empty"}), 400
        
    if session is None:
        return jsonify({"error": "Model file 'model.onnx' not found in api/ directory."}), 500

    try:
        # --- PLACE YOUR CUSTOM TOKENIZATION LOGIC HERE ---
        # Example: Convert characters/words to numbers. 
        # For demonstration, we create a dummy token array from the prompt length
        dummy_tokens = np.array([[1, 2, 3, 4, 5]], dtype=np.int64) 
        
        # Run inference using ONNX Runtime instead of heavy PyTorch
        input_name = session.get_inputs()[0].name
        outputs = session.run(None, {input_name: dummy_tokens})
        
        # --- PLACE YOUR DE-TOKENIZATION (NUMBERS TO TEXT) LOGIC HERE ---
        generated_output = f"Model evaluated successfully via ONNX Runtime! Prompt processed: '{user_prompt}'."
        
        return jsonify({"output": generated_output})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5328)
