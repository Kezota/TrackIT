from flask import Flask, request, jsonify
import cv2
import numpy as np
from facenet_pytorch import MTCNN, InceptionResnetV1
import os

# Flask app
app = Flask(__name__)

# Directory for known faces
known_faces_dir = "known_faces"
if not os.path.exists(known_faces_dir):
    os.makedirs(known_faces_dir)

# Load FaceNet models
mtcnn = MTCNN(keep_all=True)  # MTCNN for face detection
inception_resnet = InceptionResnetV1(pretrained='vggface2').eval()  # Model for face embeddings

# Function to load known faces
def load_known_faces():
    known_face_encodings = []
    known_face_names = []
    for filename in os.listdir(known_faces_dir):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            img_path = os.path.join(known_faces_dir, filename)
            img = cv2.imread(img_path)
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            faces = mtcnn(img_rgb)  # Detect faces

            if faces is not None:
                for face in faces:
                    # Get face embedding
                    face_embedding = inception_resnet(face.unsqueeze(0))
                    known_face_encodings.append(face_embedding.detach().cpu().numpy())
                    known_face_names.append(filename.split('.')[0])  # Use filename as ID

    return known_face_encodings, known_face_names

# Load known faces at the start
known_face_encodings, known_face_names = load_known_faces()

# Function to recognize a face
def recognize_face(image):
    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    faces = mtcnn(img_rgb)  # Detect faces

    if faces is not None:
        results = []
        for face in faces:
            # Get face embedding
            face_embedding = inception_resnet(face.unsqueeze(0))
            face_embedding = face_embedding.detach().cpu().numpy().flatten()

            # Compare with known faces
            distances = []
            for known_face_encoding in known_face_encodings:
                distance = np.linalg.norm(known_face_encoding - face_embedding)
                distances.append(distance)

            # Find the best match
            min_distance = min(distances)
            if min_distance < 0.6:  # Distance threshold
                name = known_face_names[distances.index(min_distance)]
                results.append({"name": name, "distance": min_distance})
            else:
                results.append({"name": "Unknown", "distance": min_distance})
        
        return results
    else:
        return [{"name": "No face detected", "distance": None}]

# API endpoint to recognize face
@app.route('/recognize-face', methods=['POST'])
def recognize_face_api():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']
    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # Recognize faces in the image
    results = recognize_face(img)
    return jsonify({"results": results})

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
