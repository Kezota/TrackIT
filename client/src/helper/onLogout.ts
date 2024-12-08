import { logout } from "@/services/apiProfiles";

export default async function onLogout() {
  try {
    await logout();
    // window.location.reload();
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
