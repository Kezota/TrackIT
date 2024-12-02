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
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    throw new Error("An error occurred while logging in");
  }

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error("An error occurred while logging out");
  }

  console.log("Logged out successfully");
  return true;
}
