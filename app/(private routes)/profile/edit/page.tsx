"use client";

import { useState, useEffect } from "react";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import { getMe, updateMe } from "@/lib/api/clientApi";

export default function EditProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState(user?.username || "");
  const router = useRouter();

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? "");
    });
  }, [user?.username]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateMe({ username });

    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            user?.avatar ||
            "https://ac.goit.global/fullstack/react/default-avatar.jpg"
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleBack}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
