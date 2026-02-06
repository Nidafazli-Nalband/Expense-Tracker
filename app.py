from flask import Flask, request, jsonify, send_file
from datetime import date
import os

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

expenses = []

@app.route("/")
def index():
    return send_file(os.path.join(BASE_DIR, "index.html"))

@app.route("/style.css")
def css():
    return send_file(os.path.join(BASE_DIR, "style.css"))

@app.route("/script.js")
def js():
    return send_file(os.path.join(BASE_DIR, "script.js"))

@app.route("/add-expense", methods=["POST"])
def add_expense():
    data = request.get_json()

    expense = {
        "title": data["title"],
        "amount": float(data["amount"]),
        "date": data.get("date", str(date.today()))
    }

    expenses.append(expense)
    return jsonify(expenses)

@app.route("/expenses")
def get_expenses():
    return jsonify(expenses)

if __name__ == "__main__":
    app.run(debug=True)
