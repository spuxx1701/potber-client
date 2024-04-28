export interface Session {
  userId: string;
  username: string;
  avatarUrl: string;
  cookie: string;
  iat: number;
  exp: number;
}
