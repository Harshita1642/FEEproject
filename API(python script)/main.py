from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app,origins=['http://gallery-slave.at.py.gg:3059', 'http://127.0.0.1:5000', 'http://gallery-slave.at.py.gg:3059/c', 'http://gallery-slave.at.py.gg:3059/python'])

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        data = "this is data being sent"
        return jsonify({'data': data})

@app.route('/c', methods=['POST'])
def ccompile():
    output = request.get_json()
    code = str(output['code'])
    with open('input.c', 'w') as i:
        i.write(code)
    cmd = ["gcc", "input.c", "-o", "output.exe"]
    subprocess.run(cmd, check=True)
    run = subprocess.run(["output.exe"], stdout=subprocess.PIPE)
    final = run.stdout.decode('utf-8')
    print(final)
    return jsonify({"answer": final})


@app.route('/python', methods=['POST'])
def pycompile():
    output = request.get_json()
    code = str(output['code'])
    with open('input', 'w') as i:
        i.write(code)
    cmd = ["python", "input", ">", "output"]
    subprocess.run(cmd, shell=True, check=True)
    with open('output', 'r') as i:
        final = i.read()
    print(final)
    return jsonify({"answer": final})


if __name__ == '__main__':
    app.run(debug=True)