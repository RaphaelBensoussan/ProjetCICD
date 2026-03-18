import os
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text

app = Flask(__name__)
CORS(app) # Autorise le frontend à appeler l'API

# Connexion à la BDD
DB_URL = os.environ.get("DB_URL", "postgresql://user:pwd@db:5432/mydb")
engine = create_engine(DB_URL)

# Création de la table au démarrage AVEC système de tentatives
def init_db():
    retries = 5
    while retries > 0:
        try:
            with engine.connect() as conn:
                conn.execute(text("CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, texte VARCHAR(255))"))
                conn.commit()
            print("Connexion réussie et table vérifiée !")
            break # Si ça marche, on sort de la boucle
        except Exception as e:
            print(f"Base de données non prête, nouvelle tentative dans 3 secondes... (Restant: {retries})")
            retries -= 1
            time.sleep(3)

# On lance l'initialisation
init_db()

@app.route('/messages', methods=['GET'])
def get_messages():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM messages")).fetchall()
        return jsonify([{"id": row[0], "texte": row[1]} for row in result])

@app.route('/messages', methods=['POST'])
def add_message():
    msg = request.json.get('texte')
    with engine.connect() as conn:
        conn.execute(text("INSERT INTO messages (texte) VALUES (:texte)"), {"texte": msg})
        conn.commit()
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)