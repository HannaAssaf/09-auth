import css from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found - 404",
  description: "Not found page",
  openGraph: {
    title: `Not found page 404`,
    description: "The page you are looking for does not exist.",
    url: `https://08-zustand-fawn.vercel.app/not-found`,
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

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
