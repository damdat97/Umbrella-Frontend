import {Role} from "./role";

export interface UserToken {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  phone: string;
  accessToken: string;
  enabled: boolean;
  roles: Role[]
}
