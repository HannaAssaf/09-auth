import AuthNavigation from "../AuthNavigation/AuthNavigation";
import TagsMenu from "../TagsMenu/TagsMenu";
import css from "./Header.module.css";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Header() {
  const token = (await cookies()).get("accessToken")?.value;
  const isAuthenticated = Boolean(token);

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" aria-label="Home">
              Home
            </Link>
          </li>
          <TagsMenu />
          <AuthNavigation isAuthenticated={isAuthenticated} />
        </ul>
      </nav>
    </header>
  );
}
