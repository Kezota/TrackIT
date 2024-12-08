from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2
import numpy as np
from facenet_pytorch import MTCNN, InceptionResnetV1
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Direktori untuk gambar wajah yang sudah dikenal
known_faces_dir = "known_faces"
if not os.path.exists(known_faces_dir):
    os.makedirs(known_faces_dir)

# Load model FaceNet
mtcnn = MTCNN(keep_all=True)  # MTCNN untuk deteksi wajah
inception_resnet = InceptionResnetV1(pretrained='vggface2').eval()  # Model untuk embedding wajah

# Fungsi untuk memuat wajah yang sudah dikenal
def load_known_faces():
    known_face_encodings = []
    known_face_names = []
    for filename in os.listdir(known_faces_dir):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            img_path = os.path.join(known_faces_dir, filename)
            img = cv2.imread(img_path)
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            faces = mtcnn(img_rgb)  # Deteksi wajah

            if faces is not None:
                for face in faces:
                    # Dapatkan embedding wajah (pastikan face sudah berupa tensor)
                    face_embedding = inception_resnet(face.unsqueeze(0))  # Tambahkan dimensi batch
                    known_face_encodings.append(face_embedding.detach().cpu().numpy())  # Simpan embedding wajah
                    known_face_names.append(filename.split('.')[0])  # Gunakan nama file sebagai ID

    return known_face_encodings, known_face_names

# Fungsi untuk mengenali wajah dari gambar
def recognize_face(frame, known_face_encodings, known_face_names):
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    faces = mtcnn(img_rgb)  # Deteksi wajah dalam gambar

    if faces is not None:
        for face in faces:
            # Dapatkan embedding wajah untuk perbandingan
            face_embedding = inception_resnet(face.unsqueeze(0))
            face_embedding = face_embedding.detach().cpu().numpy().flatten()  # Ubah menjadi array 1D

            # Perbandingan dengan wajah yang sudah dikenal
            distances = []
            for known_face_encoding in known_face_encodings:
                distance = np.linalg.norm(known_face_encoding - face_embedding)
                distances.append(distance)

            # Tentukan wajah yang paling cocok
            min_distance = min(distances)
            if min_distance < 0.6:  # Threshold jarak (bisa disesuaikan)
                name = known_face_names[distances.index(min_distance)]
                accuracy = round(100 - (min_distance * 100), 2)  # Accuracy as percentage
                return name, accuracy
            else:
                return "Unknown", 0.0
    return "No face detected", 0.0

# Flask API endpoint
@app.route('/api/attendance', methods=['POST'])
def handle_attendance():
    if 'image' not in request.files:
        return jsonify({"error": "No image file found"}), 400

    image_file = request.files['image']
    image_filename = secure_filename(image_file.filename)
    image_path = os.path.join("uploads", image_filename)

    if not os.path.exists("uploads"):
        os.makedirs("uploads")

    image_file.save(image_path)

    # Load the known faces and names
    known_face_encodings, known_face_names = load_known_faces()

    # Read the image and recognize faces
    img = cv2.imread(image_path)
    name, accuracy = recognize_face(img, known_face_encodings, known_face_names)

    # Clean up the uploaded image
    os.remove(image_path)

    # Return the result as JSON
    return jsonify({"name": name, "accuracy": accuracy})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
