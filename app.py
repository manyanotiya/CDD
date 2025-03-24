from flask import Flask, request, render_template, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from flask_cors import CORS

from flask import Flask, render_template

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load both models
models = {
    'pea': tf.keras.models.load_model('pea_model.keras'),
    'corn': tf.keras.models.load_model('corn_model.keras')
}

# Class labels for each model
class_labels = {
    'pea': ['Field_Pea_Ascochyta_Blight', 'Field_Pea_Healthy', 'Field_Pea_Leaf_Spot', 'Field_Pea_Powdery_Mildew'],
    'corn': ['Corn___Common_Rust','Corn___Gray_Leaf_Spot', 'Corn___Healthy', 
               'Corn___Nothern_Leaf_Blight']
}

def preprocess_image(image):
    """Preprocess image for prediction."""
    image = image.convert('RGB')  # Ensure RGB mode
    image = image.resize((128, 128))  # Resize to match model input size
    image_array = np.array(image, dtype=np.float32)  # Convert to NumPy array with float32
    return np.expand_dims(image_array, axis=0)  # Expand dimensions for model input

@app.route('/')
def index():
    """Render the main webpage."""
    return render_template('upload.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Handle image upload and return predictions."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    model_type = request.form.get('model')  # Get model type from frontend
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if model_type not in models:
        return jsonify({'error': 'Invalid model type'}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        processed_image = preprocess_image(image)

        # Load the appropriate model
        model = models[model_type]
        prediction = model.predict(processed_image)

        # Debugging: Print raw prediction scores
        print(f"Raw predictions: {prediction}")

        # Get the predicted class
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        predicted_class = class_labels[model_type][predicted_class_index]

        return jsonify({
            'predicted_class': predicted_class,
            'confidence_scores': prediction.tolist()  # Return full confidence scores
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
