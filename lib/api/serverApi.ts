import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "@/types/user";
import {
  Note,
  FetchNotesParams,
  FetchNotesResponse,
  RawFetchNotesResponse,
} from "../../types/note";

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await api.get<RawFetchNotesResponse>(`/notes`, {
    params: {
      page,
      perPage,
      ...(search !== "" && { search }),
      ...(tag && tag !== "All" ? { tag } : {}),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const raw = response.data;
  return {
    page,
    perPage,
    data: raw.notes,
    total_pages: raw.totalPages,
  };
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
