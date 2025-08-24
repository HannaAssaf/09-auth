import css from "./SidebarNotes.module.css";
import Link from "next/link";

const tagCategoriesSidebar: string[] = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const NotesSidebar = async () => {
  return (
    <ul className={css.menuList}>
      {tagCategoriesSidebar.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
