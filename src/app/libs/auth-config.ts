/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions, User } from "next-auth"
import { aU } from "@fullcalendar/core/internal-common";

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
      email: {},
      password: {}
    },
      async authorize(credentials, req) {

        const response = await fetch("https://erp.sitesdahora.com.br/api/login", {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
        });
          
        if (response.status !== 200) return null;
        const authData = await response.json();
        // console.log(authData)

        const user: User = {
                id: authData.user.id,
                name: authData.user.name,
                email: authData.user.email,
                token: authData.token,
                permission: authData.user.level,
                enterprise_id: authData.user.enterprise_id
        }
        if (user) {
          // console.log(user)
          return user
        
        } else {
         return null
        }

        // console.log(credentials)
        // return null

     }
  })
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log(user)

      if (user) {
        // console.log(user)
        token.enterprise_id = user.enterprise_id
        token.chave = user.token
        token.permission = user.permission
      }

      // console.log("status",status)
      // console.log("chave",chave)
      // console.log("User",user)
      return token;
    },

    async session({ session, token }) {
      // console.log("Token", token)

      if (token) {
        session.user.enterprise_id = token.enterprise_id
        session.user.token = token.chave
        session.user.permission = token.permission
      }

      return session;
    },
  }

}