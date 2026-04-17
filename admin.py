import os
import socket
from flask import Flask, render_template, request, redirect, url_for, abort

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
STATIC_DIR = os.path.join(BASE_DIR, 'static')
SCANNED_LOGS_DIR = os.path.join(BASE_DIR, 'scanned_logs')

if not os.path.exists(SCANNED_LOGS_DIR):
    os.makedirs(SCANNED_LOGS_DIR)

app = Flask(
    __name__,
    template_folder=TEMPLATES_DIR,
    static_folder=STATIC_DIR,
    static_url_path='/static'
)


def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        return s.getsockname()[0]
    except Exception:
        return '127.0.0.1'
    finally:
        s.close()


@app.route('/')
def index():
    local_ip = get_local_ip()
    hostname = socket.gethostname()
    log_files = sorted(os.listdir(SCANNED_LOGS_DIR))
    return render_template('admin.html', local_ip=local_ip, hostname=hostname, log_files=log_files)


@app.route('/logs/<path:filename>')
def show_log(filename):
    safe_path = os.path.normpath(os.path.join(SCANNED_LOGS_DIR, filename))
    if not safe_path.startswith(SCANNED_LOGS_DIR) or not os.path.exists(safe_path):
        abort(404)

    with open(safe_path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    return render_template('log_view.html', filename=filename, content=content, local_ip=get_local_ip())


@app.route('/clear-logs', methods=['POST'])
def clear_logs():
    for filename in os.listdir(SCANNED_LOGS_DIR):
        path = os.path.join(SCANNED_LOGS_DIR, filename)
        if os.path.isfile(path):
            try:
                os.remove(path)
            except OSError:
                pass
    return redirect(url_for('index'))


if __name__ == '__main__':
    local_ip = get_local_ip()
    print('--- AI CCTV ADMIN SERVER STARTING ---')
    print(f'Admin panel: http://{local_ip}:5001')
    app.run(host='0.0.0.0', port=5001, debug=False)
