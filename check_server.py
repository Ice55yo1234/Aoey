import urllib.request

for url in ['http://127.0.0.1:5000', 'http://192.168.1.78:5000']:
    try:
        with urllib.request.urlopen(url, timeout=5) as r:
            data = r.read(100)
            print(url, r.status, len(data), data[:100])
    except Exception as e:
        print(url, 'ERROR', e)
