"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type AuthMode = "login" | "signup";

function sanitizeRedirect(path: string | null): string {
  if (!path || !path.startsWith("/")) {
    return "/problems";
  }
  if (path.startsWith("//")) {
    return "/problems";
  }
  return path;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const redirectTo = useMemo(
    () => sanitizeRedirect(searchParams.get("redirect")),
    [searchParams]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage("Email and password are required.");
      return;
    }

    if (mode === "signup" && !trimmedName) {
      setErrorMessage("Name is required for signup.");
      return;
    }

    try {
      if (mode === "login") {
        await login({ email: trimmedEmail, password: trimmedPassword });
      } else {
        await signup({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        });
      }
      router.replace(redirectTo);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to authenticate.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#d8dce0]">
      <header className="border-b border-[#d3d7dc] bg-[#f7f8fa]">
        <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between px-5">
          <div className="flex items-center gap-6 text-[#555d67]">
            <span className="text-2xl text-[#f59e0b]">⌂</span>
            <button className="text-sm hover:text-[#14171f]">Explore</button>
            <button className="text-sm hover:text-[#14171f]">Problems</button>
            <button className="text-sm hover:text-[#14171f]">Contest</button>
            <button className="text-sm hover:text-[#14171f]">Discuss</button>
            <button className="text-sm hover:text-[#14171f]">Interview</button>
            <button className="text-sm text-[#f59e0b]">Store</button>
          </div>
          <button className="rounded-xl bg-[#f8ecda] px-4 py-1.5 text-sm font-medium text-[#e89600]">
            Premium
          </button>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-[1200px] items-center justify-center px-4 py-12">
        <section className="w-full max-w-[430px] rounded-sm border border-[#d5dae1] bg-[#f7f8fa] px-7 py-8 shadow-[0_1px_0_#cdd3db]">
          <div className="mb-6 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] text-lg text-[#f59e0b]">
              ⌂
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-[#171a21]">MLBoost</h1>
          </div>

          <div className="mb-4 grid grid-cols-2 overflow-hidden rounded border border-[#d3d8df]">
            <button
              type="button"
              onClick={() => setMode("login")}
              data-testid="auth-tab-login"
              className={`py-2 text-sm ${
                mode === "login"
                  ? "bg-[#465e6b] font-medium text-white"
                  : "bg-white text-[#5b6572]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              data-testid="auth-tab-signup"
              className={`py-2 text-sm ${
                mode === "signup"
                  ? "bg-[#465e6b] font-medium text-white"
                  : "bg-white text-[#5b6572]"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" ? (
              <label className="block">
                <span className="sr-only">Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Name"
                  className="w-full rounded border border-[#cbd2db] bg-white px-3 py-2.5 text-sm text-[#1a212b] outline-none ring-[#4f6773] placeholder:text-[#8ca0b2] focus:ring-1"
                />
              </label>
            ) : null}
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Username or E-mail"
                className="w-full rounded border border-[#cbd2db] bg-white px-3 py-2.5 text-sm text-[#1a212b] outline-none ring-[#4f6773] placeholder:text-[#8ca0b2] focus:ring-1"
              />
            </label>
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full rounded border border-[#cbd2db] bg-white px-3 py-2.5 text-sm text-[#1a212b] outline-none ring-[#4f6773] placeholder:text-[#8ca0b2] focus:ring-1"
              />
            </label>

            {errorMessage ? (
              <p className="rounded border border-[#e6b4b4] bg-[#fef4f4] px-3 py-2 text-sm text-[#b21f1f]">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              data-testid="auth-submit"
              className="flex w-full items-center justify-center gap-2 rounded bg-[#455d69] py-2.5 text-sm font-medium text-white hover:bg-[#3e5561] disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm text-[#4b5e6d]">
            <Link href="#" className="hover:underline">
              Forgot Password?
            </Link>
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Back to Login"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#d8dce0] text-[#4f5966]">
          Loading authentication...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
