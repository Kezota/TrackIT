import { useEffect, useState } from "react";
import { login } from "@/services/apiProfiles";
import getLoggedUser from "@/helper/getLoggedUser";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import onLogout from "@/helper/onLogout";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedUser = getLoggedUser();

    if (loggedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const { user, session } = await login(email, password);
      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <section className="w-[100vw]">
      <div className="mx-auto my-auto flex h-full flex-col items-center justify-center px-6 py-8 lg:py-0">
        <div className="w-full rounded-lg bg-white/65 shadow backdrop-blur-sm dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            {isLoggedIn ? (
              <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="text-xl font-bold">
                  You are already logged in!
                </h1>
                <Button
                  onClick={onLogout}
                  color="primary"
                  href="/login"
                  className="relative overflow-visible rounded-lg bg-background/30 bg-primary px-8 shadow-xl after:absolute after:inset-0 after:z-[-1] after:rounded-lg after:bg-background/40 after:transition after:!duration-500 after:content-[''] hover:-translate-y-1 hover:after:scale-150 hover:after:opacity-0"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                {" "}
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-3xl">
                  Log in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your binusian email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="name@binus.ac.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && (
                    <p className="mt-0 text-[13px] text-red-500">{error}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary hover:underline dark:text-primary"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white transition-colors duration-300 hover:bg-primary/70 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Log in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginCard;
