import Link from "next/link";
import { Note } from "@/types/note";

type Props = {
  item: Note;
};

const NotesPage = ({ item }: Props) => {
  return (
    <li>
      <Link href={`/notes/${item.id}`}>{item.title}</Link>
    </li>
  );
};

export default NotesPage;
