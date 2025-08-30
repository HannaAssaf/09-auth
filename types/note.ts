export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

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

export interface RegisterRequestData {
  email: string;
  password: string;
}
