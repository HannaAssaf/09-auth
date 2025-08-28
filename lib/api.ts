import type { Note, FetchNotesProps, NewNoteData } from "@/types/note";
import { api } from "../app/api/api";

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  tag?: string,
  perPage: number = 12
) => {
  const config = {
    params: {
      search,
      page,
      tag,
      perPage,
    },
  };
  const response = await api.get<FetchNotesProps>(`/notes`, config);
  return response.data;
};

export const createNote = async (data: NewNoteData) => {
  const response = await api.post<Note>(`/notes`, data);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};
