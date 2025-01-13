from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "<h1>Hello World</h1>"


@app.route("/process-input", methods=["GET"])
def process_input():
    text: str = request.args.get("text")
    if not text:
        return 400

    return jsonify("Hello World")


if __name__ == "__main__":
    app.run(port=8000, debug=True)

app.add_url_rule("/", "index", index)
