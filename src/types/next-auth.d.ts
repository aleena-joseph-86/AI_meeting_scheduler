import NextAuth from 'next-auth';
import { Session, JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    email?: string;
    name?: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    email?: string;
    name?: string;
  }
}
