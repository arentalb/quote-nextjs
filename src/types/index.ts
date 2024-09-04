export enum Role {
  User = "user",
  Admin = "admin",
}
export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}
