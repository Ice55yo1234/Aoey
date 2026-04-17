from flask import Flask, jsonify, send_from_directory
from pathlib import Path
from love_messages import random_message, random_poem, random_promise

BASE_DIR = Path(__file__).resolve().parent
app = Flask(__name__, static_folder=str(BASE_DIR), template_folder=str(BASE_DIR))
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/styles.css')
def styles():
    return send_from_directory(BASE_DIR, 'styles.css')

@app.route('/script.js')
def script():
    return send_from_directory(BASE_DIR, 'script.js')

@app.route('/api/message')
def api_message():
    return jsonify({'message': random_message()})

@app.route('/api/poem')
def api_poem():
    return jsonify({'poem': random_poem()})

@app.route('/api/promise')
def api_promise():
    return jsonify({'promise': random_promise()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
