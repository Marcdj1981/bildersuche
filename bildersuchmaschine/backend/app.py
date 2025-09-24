from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3, os
from datetime import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

DB_FILE = "database.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT,
            tags TEXT,
            upload_date TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    tags = request.form.get("tags", "")


    filename = datetime.now().strftime("%Y%m%d%H%M%S_") + file.filename
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("INSERT INTO images (filename, tags, upload_date) VALUES (?, ?, ?)",
              (filename, tags, datetime.now().isoformat()))
    conn.commit()
    conn.close()

    return jsonify({"message": "Upload erfolgreich", "filename": filename})

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "").lower()

    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    if query:
        c.execute("SELECT * FROM images WHERE lower(tags) LIKE ?", (f"%{query}%",))
    else:
        c.execute("SELECT * FROM images ORDER BY id DESC")
    results = c.fetchall()
    conn.close()

    images = [{"id": r[0], "filename": r[1], "tags": r[2], "upload_date": r[3]} for r in results]
    return jsonify(images)

@app.route("/images/<filename>")
def get_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
