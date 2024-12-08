import { supabase } from "./supabase";

export async function getProfiles() {
  const { data, error } = await supabase.from("Profile").select("*");

  if (error) {
    console.log(error);
    throw new Error("An error occurred while fetching profiles");
  }

  return data;
}

export async function getProfileByEmail(email: string) {
  const { data, error } = await supabase
    .from("Profile")
    .select("*")
    .eq("email", email);

  if (error) {
    console.log(error);
    throw new Error("An error occurred while fetching profiles");
  }

  return data;
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error("An error occurred while logging in");
  }

  if (email.includes("admin"))
    window.location.href = "/lecturer"; // Redirect to /lecturer
  else window.location.href = "/profile"; // Redirect to profile

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error("An error occurred while logging out");
  }

  console.log("Logged out successfully");
  return true;
}
