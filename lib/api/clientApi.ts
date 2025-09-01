import type {
  Note,
  FetchNotesProps,
  NewNoteData,
  RegisterRequestData,
  LoginRequestData,
  CheckSessionRequest,
  UpdateUser,
} from "@/types/note";
import type { User } from "@/types/user";
import { api } from "../../app/api/api";

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: string
) => {
  const config = {
    params: {
      page,
      perPage,
      search,
      tag,
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

export const register = async (payload: RegisterRequestData): Promise<User> => {
  const response = await api.post<User>(`/auth/register`, payload);
  return response.data;
};

export const login = async (payload: LoginRequestData): Promise<User> => {
  const response = await api.post<User>(`/auth/login`, payload);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post<User>(`/auth/logout`);
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

export const updateMe = async (payload: UpdateUser): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};
