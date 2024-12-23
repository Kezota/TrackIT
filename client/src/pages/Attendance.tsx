import { Footer } from "@/components/Footer";
import NavBar from "../components/NavBar";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import getLoggedUser from "@/helper/getLoggedUser";
import {getProfileByEmail, getProfileByName} from "@/services/apiProfiles";
import { supabase } from "@/services/supabase";
import { insertAttendance } from "@/services/apiAttendances";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState<{
    name: string;
    accuracy: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const handleSubmit = async () => {
    if (capturedImage) {
      const blob = await fetch(capturedImage).then((res) => res.blob());
      const formData = new FormData();
      formData.append("image", blob, "captured-image.jpg");

      setIsLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/attendance",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setAttendanceData(response.data);
        setError(null);

        // Insert attendance to the database
        if (response.data.name) {
          const student = await getProfileByName(response.data.name);

          async function uploadImage(
            imageBlob: Blob,
            fileName: string,
          ): Promise<string | null> {
            const { data, error } = await supabase.storage
              .from("attendance-photos")
              .upload(fileName, imageBlob);

            if (error) {
              console.error("Error uploading image:", error);
              return null;
            }
            const imagePath = `https://dbyrzlhtcbnhzqugovla.supabase.co/storage/v1/object/public/attendance-photos/${fileName}`;

            return imagePath || null;
          }

          async function handleAttendance() {
            try {
              const imageBlob = dataURLToBlob(capturedImage!);
              const fileName = `${student[0].studentId}-${Date.now()}.png`;
              const imageUrl = await uploadImage(imageBlob, fileName);

              if (imageUrl) {
                const attendance = {
                  name: student[0].fullName,
                  studentId: student[0].studentId,
                  attendDate: getCurrentDate(),
                  attendTime: getCurrentTime(),
                  evidancePhoto: imageUrl,
                };

                // Save attendance to your database
                await insertAttendance(attendance);
              }
            } catch (err) {
              console.error(
                "Error in face recognition or no face detected",
                err,
              );
            } finally {
              setIsLoading(false); // Set loading state to false
            }
          }

          await handleAttendance();
        }
      } catch (err) {
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
              className="mt-2 w-full max-w-md"
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
                    className="max-w-md"
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
                <p>Name: {attendanceData.name}</p>
                <p>Accuracy: {attendanceData.accuracy}</p>
              </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getCurrentTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function dataURLToBlob(dataURL: string): Blob {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

async function uploadImage(
  imageBlob: Blob,
  fileName: string,
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from("your-bucket-name") // Replace with your bucket name
    .upload(fileName, imageBlob);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  return data?.path || null;
}

export default Attendance;
