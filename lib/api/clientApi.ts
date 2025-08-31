import type {
  Note,
  FetchNotesProps,
  NewNoteData,
  RegisterRequestData,
  LoginRequestData,
} from "@/types/note";
import type { User } from "@/types/user";
import { api } from "../../app/api/api";

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  tag?: string,
  perPage: number = 12
) => {
  try {
    if (!localStorage.getItem("accessToken")) {
      throw new Error("User is not authenticated");
    }
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
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const axiosError = err as any;
      if (axiosError.response?.status === 401) {
        window.location.href = "/sign-in";
        return;
      }
    }
    throw err;
  }
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

export const register = async (payload: RegisterRequestData): Promise<User> => {
  const response = await api.post<User>(`/auth/register`, payload);
  return response.data;
};

export const login = async (payload: LoginRequestData): Promise<User> => {
  const response = await api.post<User>(`/auth/login`, payload);
  return response.data;
};
