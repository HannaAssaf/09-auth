"use client";

import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleBack} aria-label="Note Preview">
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>Content: {note.content}</p>
          <p className={css.content}>Note tag: {note.tag}</p>
          <p className={css.date}>Note Id: {note.id}</p>
          <p className={css.date}>Note created at: {note.createdAt}</p>
          <button
            onClick={handleBack}
            className={css.routerBtn}
            aria-label="Close Note Preview"
          >
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}
