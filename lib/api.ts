import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

export interface FetchNotesProps {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface TagType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

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
  const response = await axios.get<FetchNotesProps>(`/notes`, config);
  return response.data;
};

export const createNote = async (data: NewNoteData) => {
  const response = await axios.post<Note>(`/notes`, data);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

// export const fetchTags = async () => {
//   const response = await axios.get<NoteTag[]>(`/notes/tag`);
//   return response.data;
// };
