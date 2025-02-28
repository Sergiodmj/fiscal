/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions, User } from "next-auth"

export const auth: NextAuthOptions = {
  
    pages: {
    signIn: "/",
    signOut: '/',
    error: '/',
  },

  providers: [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: {},
      password: {}
    },
      async authorize(credentials, req) {

        const response = await fetch("https://systemcode.sitesdahora.com.br/api/login", {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
        });
          
        if (response.status !== 200) return null;
        const authData = await response.json();
        console.log(authData)

        const user: User = {
                id: authData.user.id,
                token: authData.token,
                name: authData.user.name,
                username: authData.user.username,
                email_verified_at: authData.user.email_verified_at,
                type_user: authData.user.type_user,
                status: authData.user.status,
                user_id: authData.user.user_id,
        }
        if (user) {
          // console.log(user)
          return user
        
        }
        else {
         return null
        }

     }
  })
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log(user)

      if (user) {
        // console.log(user)
        token.user_id = user.user_id
        token.chave = user.token
        token.username = user.username
      }

      return token;
    },

    async session({ session, token }) {

      if (token) {
        session.user.user_id = token.user_id
        session.user.token = token.chave
        session.user.username = token.username
      }

      return session;
    },
  }

}