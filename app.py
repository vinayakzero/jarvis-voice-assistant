import os
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='/static')
app.secret_key = 'vinayak_vallabh_rai_secret_key_2026'

@app.route('/')
def home():
    return render_template('index.html', active_page='home')

@app.route('/about')
def about():
    return render_template('about-me-detail.html', active_page='about')

@app.route('/education')
def education():
    return render_template('education-detail.html', active_page='about')

@app.route('/skills')
def skills():
    return render_template('skills-detail.html', active_page='skills')

@app.route('/projects')
def projects():
    return render_template('project-detail.html', active_page='projects')

@app.route('/youtube')
def youtube():
    return render_template('youtube-detail.html', active_page='youtube')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
        return jsonify({'status': 'success', 'message': f'Thank you {name}, your message has been sent successfully!'})
    return render_template('contact.html', active_page='contact')

@app.route('/resume')
def resume():
    return render_template('resume-preview.html', active_page='resume')

# Explicit static file handler for Vercel Serverless Python
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
