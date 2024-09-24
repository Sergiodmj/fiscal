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
      email: {},
      password: {}
    },
      async authorize(credentials, req) {

        const response = await fetch("https://la.sitesdahora.com.br/api/login", {
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
                status: authData.status,
                token: authData.token,
                permission: authData.user.permission
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
        token.status = user.status
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
        session.user.status = token.status
        session.user.token = token.chave
        session.user.permission = token.permission
      }

      return session;
    },
  }

}