/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import NextAuth from "next-auth"
import { auth } from "@/app/libs/auth.config";


const handler = NextAuth(auth)

export { handler as GET, handler as POST }