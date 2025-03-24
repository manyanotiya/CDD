from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS from the start

# ================= ROUTES ===================

@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/login')
def login():
    return render_template('login.html')

# =============== MODEL LOADING ==============

models = {
    'pea': tf.keras.models.load_model('pea_model.keras'),
    'corn': tf.keras.models.load_model('corn_model.keras')
}

class_labels = {
    'pea': ['Field_Pea_Ascochyta_Blight', 'Field_Pea_Healthy', 'Field_Pea_Leaf_Spot', 'Field_Pea_Powdery_Mildew'],
    'corn': ['Corn___Common_Rust','Corn___Gray_Leaf_Spot', 'Corn___Healthy', 'Corn___Nothern_Leaf_Blight']
}

# ============= IMAGE PREPROCESSING =============

def preprocess_image(image):
    image = image.convert('RGB')
    image = image.resize((128, 128))
    image_array = np.array(image, dtype=np.float32)
    return np.expand_dims(image_array, axis=0)

# ================ PREDICTION ROUTE ==================

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    model_type = request.form.get('model')

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if model_type not in models:
        return jsonify({'error': 'Invalid model type'}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        processed_image = preprocess_image(image)
        prediction = models[model_type].predict(processed_image)

        print(f"Raw predictions: {prediction}")
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        predicted_class = class_labels[model_type][predicted_class_index]

        return jsonify({
            'predicted_class': predicted_class,
            'confidence_scores': prediction.tolist()
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ================ APP RUN ==================
if __name__ == '__main__':
    app.run(debug=True)
