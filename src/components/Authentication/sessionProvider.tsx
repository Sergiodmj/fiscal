import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextAuthProviderProps {
    children: ReactNode
}

export default function NextAuthSessionProvider({ children }: NextAuthProviderProps ) {
    return <SessionProvider>{ children }</SessionProvider>
}