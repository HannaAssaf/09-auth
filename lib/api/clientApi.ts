import type {
  Note,
  NewNoteData,
  RegisterRequestData,
  LoginRequestData,
  CheckSessionRequest,
  UpdateUser,
  FetchNotesParams,
  FetchNotesResponse,
  RawFetchNotesResponse,
} from "@/types/note";
import type { User } from "@/types/user";
import { nextServer } from "./api";

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<RawFetchNotesResponse>(`/notes`, {
    params: {
      page,
      perPage,
      ...(search !== "" && { search }),
      ...(tag && tag !== "All" ? { tag } : {}),
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
export const createNote = async (payload: NewNoteData) => {
  const response = await nextServer.post<Note>(`/notes`, payload);
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const register = async (payload: RegisterRequestData): Promise<User> => {
  const response = await nextServer.post<User>(`/auth/register`, payload);
  return response.data;
};

export const login = async (payload: LoginRequestData): Promise<User> => {
  const response = await nextServer.post<User>(`/auth/login`, payload);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post<User>(`/auth/logout`);
};

export const checkSession = async (): Promise<Boolean> => {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: UpdateUser): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", payload);
  return data;
};
