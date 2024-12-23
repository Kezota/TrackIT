export default function getLoggedUser() {
  const sessionToken = localStorage.getItem(
    "sb-dbyrzlhtcbnhzqugovla-auth-token",
  );
  if (sessionToken) {
    const session = JSON.parse(sessionToken);
    if (session && session.user) {
      return session.user.email;
    }
  }

  return null;
}
