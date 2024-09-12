export enum Role {
  User = "user",
  Admin = "admin",
}

export interface SignUpUserParams {
  username: string;
  email: string;
  password: string;
}

export interface SignInUserParams {
  email: string;
  password: string;
}

export interface UpdateProfileParams {
  email: string;
  username: string;
}

export interface CreateQuoteParams {
  title: string;
  body: string;
}
