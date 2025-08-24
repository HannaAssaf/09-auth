import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug && slug.length > 0 ? slug.join(", ") : "All";
  return {
    title: `${filter} note list`,
    description: `Viewing notes with filter: ${filter}`,
    openGraph: {
      title: `Note list page: ${filter}`,
      description: `Viewing notes with filter: ${filter}. Here you will find all notes that match the selected filter.`,
      url: `https://08-zustand-fawn.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Note list filter - ${filter}`,
        },
      ],
      type: "article",
    },
  };
}

export default async function NotesAll({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const initialData = await fetchNotes("", 1, tag);
  return <NotesClient initialData={initialData} tag={tag} />;
}
