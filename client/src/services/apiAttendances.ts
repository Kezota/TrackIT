import { supabase } from "./supabase";

export async function getAttendances() {
  const { data, error } = await supabase.from("Attendance").select("*");

  if (error) {
    console.log(error);
    throw new Error("An error occurred while fetching attendances");
  }

  return data;
}

export async function deleteAttendanceById(id: number) {
  const { error } = await supabase.from("Attendance").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("An error occurred while deleting the attendance");
  }
}
