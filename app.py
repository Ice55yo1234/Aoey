"""
AI CCTV Face Recognition System
ระบบตรวจจับใบหน้าและวิเคราะห์อายุ เพศ อารมณ์
"""

import os
import socket
import cv2
import numpy as np
import base64
from flask import Flask, render_template, request, jsonify

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
STATIC_DIR = os.path.join(BASE_DIR, 'static')
app = Flask(
    __name__,
    template_folder=TEMPLATES_DIR,
    static_folder=STATIC_DIR,
    static_url_path='/static'
)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# โฟลเดอร์เก็บ log ใบหน้าที่สแกน
SCANNED_LOGS_DIR = os.path.join(BASE_DIR, 'scanned_logs')
if not os.path.exists(SCANNED_LOGS_DIR):
    os.makedirs(SCANNED_LOGS_DIR)


@app.route('/')
def index():
    """Render the main page."""
    local_ip = get_local_ip()
    admin_url = f'http://{local_ip}:5001'
    print('GET / called')
    return render_template('index.html', local_ip=local_ip, admin_url=admin_url)


@app.route('/analyze', methods=['POST'])
def analyze():
    """Analyze face from image data."""
    try:
        data = request.json['image']
        header, encoded = data.split(",", 1)
        image_data = base64.b64decode(encoded)
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.08,
            minNeighbors=5,
            minSize=(40, 40),
            flags=cv2.CASCADE_SCALE_IMAGE
        )

        output = []
        for (x, y, w, h) in faces:
            # ตรวจสอบรูปทรงให้ใกล้เคียงใบหน้ามนุษย์
            ratio = float(w) / float(h)
            if ratio < 0.6 or ratio > 1.4:
                continue

            face_roi = gray[y:y+h, x:x+w]
            eyes = eye_cascade.detectMultiScale(face_roi, scaleFactor=1.1, minNeighbors=3, minSize=(15, 15))

            # ยืนยันว่ามีดวงตาอย่างน้อย 1 ข้างในกรอบ
            if len(eyes) >= 1:
                output.append({
                    "box": [int(y), int(x + w), int(y + h), int(x)]  # top, right, bottom, left
                })

        return jsonify(output)
    except Exception as e:
        return jsonify({"error": str(e)})


def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]
    except Exception:
        return '127.0.0.1'
    finally:
        s.close()


if __name__ == '__main__':
    local_ip = get_local_ip()
    print('--- AI CCTV SYSTEM STARTING ---')
    print(f'Access from this machine: http://localhost:5000')
    print(f'Access from other devices on the same network: http://{local_ip}:5000')
    app.run(host='0.0.0.0', port=5000, debug=False)