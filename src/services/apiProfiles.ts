import { supabase } from "./supabase";

export async function getProfiles() {
  const { data, error } = await supabase.from("Profile").select("*");

  if (error) {
    console.log(error);
    throw new Error("An error occurred while fetching profiles");
  }

  return data;
}

export async function getProfileByEmailAndPassword(
  email: string,
  password: string,
) {
  const { data, error } = await supabase
    .from("Profile")
    .select("*")
    .eq("email", email)
    .eq("password", password);

  if (error) {
    console.log(error);
    throw new Error("An error occurred while fetching profiles");
  }

  return data;
}
