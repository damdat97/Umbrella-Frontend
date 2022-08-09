import {Role} from "./role";

export interface User {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  name : string;
  phone: string;
  address: string;
  email: string;
  enabled: boolean;
  roles: [Role];
}
