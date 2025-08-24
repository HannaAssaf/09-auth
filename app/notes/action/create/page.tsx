import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

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

export default async function CreateNote() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  );
}
