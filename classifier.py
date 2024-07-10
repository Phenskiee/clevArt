import pickle
import random
import pandas as pd
import numpy as np

from PIL import Image
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from flask import Blueprint, request, render_template

model_classifier = Blueprint('classification', __name__, template_folder = 'html', static_folder = 'front-end')

############### NAIVE BAYES MODEL AND LABEL ##############
# Medium Classification Model
with open('saved_models/medium_classifier.pkl', 'rb') as medium_model:
    medium_naive_bayes = pickle.load(medium_model)

with open('saved_models/medium_label.pkl', 'rb') as medium_label:
    medium_label_encoder =  pickle.load(medium_label)

# Genre Classfification Model
with open('saved_models/genre_classifier.pkl', 'rb') as genre_model:
    genre_naive_bayes = pickle.load(genre_model)

with open('saved_models/genre_label.pkl', 'rb') as genre_label:
    genre_label_encoder = pickle.load(genre_label)

# Interpretation Classification Model
with open('saved_models/interpret_classifier.pkl', 'rb') as interpretation_model:
    interpret_naive_bayes = pickle.load(interpretation_model)

with open('saved_models/interpret_label.pkl', 'rb') as  interpretation_label:
    interpret_label_encoder = pickle.load(interpretation_label)

################## CLASSESS FOR MEDIUM AND GENRE ##################
medium_class = medium_label_encoder.classes_
genre_class = genre_label_encoder.classes_

################## VG16 MODEL ##################
base_model = VGG16(weights = 'imagenet')
feature_extraction = Model(inputs = base_model.input, outputs = base_model.get_layer('flatten').output)

################## PRE-PROCESSING FOR MEDIUM AND GENRE ##################
def preprocess_image(file):
    img = Image.open(file)
    img = img.resize((224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def classify_image(img, classifier, label_encoder):
    img_array = preprocess_image(img)
    feature = feature_extraction.predict(img_array)
    feature = feature.flatten().reshape(1, -1)
    prediction_proba = classifier.predict_proba(feature)[0]
    prediction = classifier.predict(feature)[0]
    return prediction, prediction_proba

################## ROUTE FUNCTION FOR MEDIUM AND GENRE ##################
# Medium route function
@model_classifier.route('/predict_medium', methods=['POST'])
def predict_medium():
    if request.method == 'POST':
        file = request.files['image']
        if file:
            prediction, prediction_proba = classify_image(file, medium_naive_bayes, medium_label_encoder)
            predicted_class = medium_label_encoder.inverse_transform([prediction])[0]
            predict_probability = [float(prob * 100) for prob in prediction_proba]
            class_probability = list(zip(medium_class, predict_probability))
            return render_template('mediumClassification1.html', prediction=predicted_class, class_probability=class_probability, classification_type='medium')
        return render_template('mediumClassification1.htm', prediction=None, class_probability=None, classification_type='medium')

# Genre route function
@model_classifier.route('/predict_genre', methods=['POST'])
def predict_genre():
    if request.method == 'POST':
        file = request.files['image']
        if file:
            prediction, prediction_proba = classify_image(file, medium_naive_bayes, medium_label_encoder)
            predicted_class = genre_label_encoder.inverse_transform([prediction])[0]
            predict_probability = [float(prob * 100) for prob in prediction_proba]
            class_probability = list(zip(genre_class, predict_probability))
            return render_template('genreClassification1.html', prediction=predicted_class, class_probability=class_probability, classification_type='genre')
        return render_template('genreClassification1.html', prediction=None, class_probability=None, classification_type='genre')

################## INTERPRETATION DATASET ##################
interpretation_data = pd.read_csv('interpretation_dataset/dataset_artInterpretation.csv')
interpretation_data['label'] = interpret_label_encoder.transform(interpretation_data['INTERPRETATION'])

################## PRE-PROCESSING FOR INTERPRETATION ##################
def preprocess_interpret_image(file, size=(64, 64)):
    try:
        image = Image.open(file)
        image = image.resize(size).convert('L')
        return np.array(image).flatten()
    except:
        return np.zeros(size[0] * size[1])
    
def classify_interpret_image(img, classifier):
    img_features = preprocess_interpret_image(img)
    img_features = img_features.reshape(1, -1)
    prediction_proba = classifier.predict_proba(img_features)[0]
    prediction = classifier.predict(img_features)[0]
    return prediction, prediction_proba

def generate_interpretation(category_index):
    interpretations = interpretation_data[interpretation_data['label'] == category_index]['INTERPRETATION'].tolist()
    return random.choice(interpretations)

################## ROUTE FUNCTION FOR INTERPRETATION ##################
@model_classifier.route('/predict_interpret', methods=['POST'])
def predict_interpret():
    if request.method == 'POST':
        file = request.files['image']
        if file:
            prediction, prediction_proba = classify_interpret_image(file, interpret_naive_bayes)
            interpretation = generate_interpretation(prediction)
            predict_probability = [float(prob * 100) for prob in prediction_proba]
            class_probability = list(zip(interpret_label_encoder.classes_, predict_probability))
            return render_template('interpretClassification.html', prediction=interpretation, class_probability=class_probability, classification_type='interpretation')
        return render_template('interpretClassification.html', prediction=None, class_probability=None, classification_type='interpretation')