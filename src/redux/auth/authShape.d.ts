export interface AuthShape {
  isAuthd: boolean;
  isAdmin: boolean;
  user: User;
}

export interface User {
  name: string;
  email: string;
  picture: string;
}
