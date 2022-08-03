import {Role} from "./role";

export interface User {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  name : string;
  phone: string;
  enabled: boolean;
  roles: [Role];
}
