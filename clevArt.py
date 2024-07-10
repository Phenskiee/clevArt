from flask import Flask, render_template
from classifier import model_classifier

clevArt = Flask(__name__, template_folder = "html", static_folder = "front-end")

# Register the model blueprint
clevArt.register_blueprint(model_classifier, url_prefix='/model')

# Route for Home page
@clevArt.route('/')
def home():
    return render_template('dashboard.html')

# Route for Developer
@clevArt.route('/developer.html')
def develop():
    return render_template('/developer.html')

# Route for Medium Classification
@clevArt.route('/mediumClassification.html')
def medium():
    return render_template('/mediumClassification.html')

# # Route for Genre Classification
@clevArt.route('/genreClassification.html')
def genre():
    return render_template('/genreClassification.html')

# Route for Interpretation classification
@clevArt.route('/interpretClassification.html')
def interpret():
    return render_template('/interpretClassification.html')

if __name__ == '__main__':
    clevArt.run(debug=True)