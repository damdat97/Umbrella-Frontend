import {Role} from "./role";

export interface UserToken {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  name : string;
  phone: string;
  address: string;
  email: string;
  accessToken: string;
  enabled: boolean;
  roles: Role[]
}
