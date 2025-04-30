export interface UserType {
  user_id: number;
  username: string;
  email: string;
  password: string;
  status: "CUSTOMER" | "ADMIN";
}
