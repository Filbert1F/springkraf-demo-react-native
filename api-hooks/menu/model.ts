export interface LoginModel {
  accessToken: string
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  hashedPassword: string;
  id: string;
  name: string;
}

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
}

export type NoteModel = {
  id: string;
  title:  string;
  body: string;
  createdAt: string;
  archived: boolean;
  owner: string;
};

export interface NoteCreateInput {
  title: string;
  body: string;
}

export interface NoteIdInput {
  noteId: string;
}

export type NoteType = {
  archived: boolean;
  body: string;
  createdAt: string;
  id: string;
  owner: string;
  title: string;
};

export function getRolesInput(input: any): { getRoles: () => any[] } {
  return {
    getRoles: () => input?.params?.roles || [],
  };
}