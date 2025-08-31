import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";
import { FetchNotesProps, Note } from "../../types/note";

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: string
): Promise<FetchNotesProps> => {
  const config = {
    params: {
      page,
      perPage,
      ...(search !== "" && { search }),
      ...(tag && tag !== "All" ? { tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
  const response = await api.get<FetchNotesProps>(`/notes`, config);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await api.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
