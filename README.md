# TrackIT 🎓

Welcome to **TrackIT**, an AI-powered web application that simplifies attendance tracking in universities. By leveraging facial recognition technology, TrackIT minimizes fraud, updates attendance data in real-time, and seamlessly integrates with academic systems. This platform offers a user-friendly interface for both lecturers and students, enabling practical and secure attendance monitoring.

<br>

## 🛠️ Features

- **Facial Recognition Attendance**: Automatically verifies student attendance using advanced AI-powered facial recognition.
- **Real-Time Attendance Updates**: Attendance records are updated in real-time, ensuring accurate data management.
- **Academic System Integration**: Seamlessly connects with university academic systems for effortless synchronization.
- **Secure and Reliable**: Ensures data safety while minimizing fraudulent activity.
- **Simple and Intuitive Interface**: Designed for ease of use by both students and lecturers.

## 💻 Technologies Used

- **Frontend**: React.js (TypeScript), Tailwind CSS, Vite
- **Backend**: Python Flask
- **AI**: PyTorch, OpenCV, FaceNet
- **Database**: Supabase

## 🔧 Installation

If you want to run this project locally, follow these steps:

#### Client Setup:
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser to view the client app.

#### Server Setup:
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   python main.py
   ```
4. The server will be running on `http://localhost:5000`.

### Notes:
- Python version should be between `3.7` and `3.10`.
- Avoid using Python 3.11 or above.

## 📄 Requirements

The following Python packages are required for the backend:
```
flask>=2.3.3
setuptools>=50.0.0
wheel>=0.40.0
numpy>=1.25.0
opencv-python-headless>=4.8.1.78
torch>=1.4.0
torchvision>=0.5.2
facenet-pytorch>=2.5.2
Flask-Cors>=5.0.0
werkzeug>=3.1.3
```

## 📸 Screenshots

![Screenshot of TrackIT Home Page](public/HomePage.png)  

## 👏 Credits

This project was developed collaboratively by the following team:

- **Frontend and Backend Development**: [Kezota](https://github.com/kezota)
- **AI Model Development**: [W1llH4rt](https://github.com/w1llh4rt) and [RainerYesaya](https://github.com/raineryesaya)

Special thanks to the university team for their support and to the open-source community for providing tools and inspiration.

## 🤝 Contributing

If you'd like to contribute to the development of this project, feel free to fork the repository and submit a pull request. Contributions are always welcome!
