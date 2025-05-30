import { executeQuery } from "@/app/lib/database/db";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
      authorization: {
        params: {
          scope: 'openid profile email https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        // Store tokens in JWT
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass tokens from JWT to session
      if (token) {
        session.accessToken = token.accessToken as unknown as string | undefined;
        session.refreshToken = token.refreshToken as unknown as string | undefined;
        session.email = token.email as unknown as string | undefined;
        session.name = token.name as unknown as string | undefined;
      }
      return session;
    },
  },
  events: {
      async signIn({ user, account }) {
        console.log('SIGN IN TRIGGERED');
    
        if (account?.provider === 'google') {
          const query = `
            INSERT INTO users (name, email, access_token, refresh_token)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE access_token = ?, refresh_token = ?
          `;
          const params = [
            user.name,
            user.email,
            account.access_token,
            account.refresh_token || null,
            account.access_token,
            account.refresh_token || null,
          ];
          await executeQuery(query, params);
        }
      },
    },  
    secret: process.env.NEXTAUTH_SECRET,
};
