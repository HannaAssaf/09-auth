import css from "./NoteDetails.module.css";
import type { Note } from "../../types/note";

export default function NoteDetails({ note }: { note: Note }) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
