export enum Role {
  User = "user",
  Admin = "admin",
}
export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  email: string;
  password: string;
}
