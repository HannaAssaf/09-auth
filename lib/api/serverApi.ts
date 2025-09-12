import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note, FetchNotesProps } from "../../types/note";

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
  const response = await nextServer.get<FetchNotesProps>(`/notes`, config);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const updateServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.patch("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
