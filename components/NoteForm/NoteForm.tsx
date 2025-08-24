"use client";
import { useId } from "react";
import css from "../NoteForm/NoteForm.module.css";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote, NewNoteData } from "@/lib/api";
import type { Metadata } from "next";
import { useNoteStore } from "@/lib/store/noteStore";
import { initialDraft } from "@/lib/store/noteStore";

export const metadata: Metadata = {
  title: "NoteForm",
  description: "NoteHub App",
  openGraph: {
    title: `NoteForm 08-zustand`,
    description: "Create your new note with React Query and Zustand",
    url: `https://08-zustand-fawn.vercel.app/notes/action/create`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 08-zustand",
      },
    ],
    type: "article",
  },
};

export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      clearDraft();
      toast.success("Note created successfully");
      router.push("/notes/filter/All");
    },
    onError() {
      toast.error("Error creating note.");
    },
  });

  const handleCancel = () => router.push("/notes/filter/All");

  const handleSubmit = (formData: FormData) => {
    const rawValues = Object.fromEntries(formData) as unknown as NewNoteData;
    mutate(rawValues);
    setDraft(rawValues);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          type="text"
          name="title"
          className={css.input}
          id={`${fieldId}-title`}
          defaultValue={draft ? draft.title : initialDraft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          name="content"
          className={css.textarea}
          id={`${fieldId}-content`}
          defaultValue={draft ? draft.content : initialDraft.content}
          onChange={handleChange}
          required
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          name="tag"
          className={css.select}
          id={`${fieldId}-tag`}
          defaultValue={draft ? draft.tag : initialDraft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating new note..." : "Create Note"}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
