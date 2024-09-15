export enum Role {
  User = "user",
  Admin = "admin",
}

export interface UpdateProfileParams {
  email: string;
  username: string;
}

export interface CreateQuoteParams {
  title: string;
  body: string;
}
