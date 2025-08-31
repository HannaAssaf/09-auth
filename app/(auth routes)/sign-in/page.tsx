"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
import { login } from "@/lib/api/clientApi";
import { LoginRequestData } from "@/types/note";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async (formData: FormData) => {
    setError("");
    try {
      const data = Object.fromEntries(formData) as unknown as LoginRequestData;
      const response = await login(data);
      setUser(response);
      router.push("/profile");
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Oops... some error");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
