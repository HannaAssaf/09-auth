"use client";

import React, { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import css from "./page.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import type { FetchNotesProps } from "@/lib/api";
import Link from "next/link";

interface NotesClientProps {
  initialData: FetchNotesProps;
  tag?: string | undefined;
}

function NotesClient({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);

  const [searchNote, setSearchNote] = useState<string>("");

  const updateSearchNote = useDebouncedCallback((newSearchNote: string) => {
    setSearchNote(newSearchNote);
    setPage(1);
  }, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", searchNote, page, tag],
    queryFn: () => fetchNotes(searchNote, page, tag),
    placeholderData: keepPreviousData,
    initialData:
      searchNote === "" && page === 1
        ? {
            notes: initialData.notes,
            totalPages: initialData.totalPages,
          }
        : undefined,
  });

  return (
    <>
      <div className={css.app}>
        <div className={css.toolbar}>
          <SearchBox value={searchNote} onSearch={updateSearchNote} />
          {isSuccess && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
          <Link href="/notes/action/create" className={css.createLink}>
            Create note +
          </Link>
        </div>
        {data && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </>
  );
}

export default NotesClient;
