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

@app.route('/showreel')
def showreel():
    return render_template('showreel.html', active_page='showreel')

@app.route('/work')
def work():
    return render_template('work.html', active_page='work')

@app.route('/toolkit')
def toolkit():
    return render_template('toolkit.html', active_page='toolkit')

@app.route('/services')
def services():
    return render_template('services.html', active_page='services')

@app.route('/skills')
def skills():
    return render_template('toolkit.html', active_page='toolkit')

@app.route('/projects')
def projects():
    return render_template('work.html', active_page='work')

@app.route('/youtube')
def youtube():
    return render_template('youtube.html', active_page='youtube')

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

# Explicit static file handler for Vercel Serverless Python & root static assets
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/<path:filename>')
def serve_root_files(filename):
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    return "File not found", 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
