import { Footer } from "@/components/Footer";
import NavBar from "../components/NavBar";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState<{
    name: string;
    accuracy: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const webcamRef = useRef<Webcam>(null); // Reference to the webcam
  const [capturedImage, setCapturedImage] = useState<string | null>(null); // Captured photo as a data URL

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot(); // Capture the photo
      setCapturedImage(imageSrc); // Save it as a data URL
    }
  }, [webcamRef]);

  const handleSubmit = async () => {
    if (capturedImage) {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("image", blob, "captured-image.jpg");

      setIsLoading(true); // Set loading state to true

      try {
        const response = await axios.post(
          "https://track-it-server-kezota-kezotas-projects.vercel.app/api/attendance",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer trackitgacor",
            },
            withCredentials: true,
          },
        );
        setAttendanceData(response.data); // The name and accuracy from the backend
        setError(null); // Reset any previous errors
      } catch (err) {
        console.error(err);
        setError("Error in face recognition or no face detected");
        setAttendanceData(null);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    }
  };

  return (
    <>
      <NavBar currentNav="attendance" />
      <div className="bg-slate-100 py-[20px]">
        <h1 className="pb-10 pt-[40px] text-center text-4xl font-bold">
          Attendance Page
        </h1>
        <div className="mx-5 flex flex-col items-center justify-center gap-[40px] md:flex-row">
          <div className="">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full max-w-md"
            />
            <button
              onClick={capturePhoto}
              className="mt-5 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Capture Photo
            </button>
          </div>
          <div className="">
            {capturedImage && (
              <>
                <div className="mb-5">
                  <h2 className="text-lg">Captured Image:</h2>
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="mt-2 w-full max-w-md"
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="rounded bg-green-500 px-4 py-2 text-white"
                >
                  Submit Attendance
                </button>
              </>
            )}

            {isLoading && <p>Detect image...</p>}
            {attendanceData && !isLoading && (
              <div>
                <p>Name: {extractFullName(attendanceData.name)}</p>
                {/* <p>Accuracy: {attendanceData.accuracy}</p> */}
              </div>
            )}
            {error && !isLoading && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const extractFullName = (name: string): string => {
  return name.split(" (")[0];
};

export default Attendance;
