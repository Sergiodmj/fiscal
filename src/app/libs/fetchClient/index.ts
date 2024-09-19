/* eslint-disable prettier/prettier */
'use client'

import { signOut } from "next-auth/react"

export const fethClient = async(
    input: string | URL | Request,
    init?: RequestInit | undefined
): Promise<Response> => {
    
    // const jwt = getCookie("jwt");

    const response = await fetch(input, {
        ...init,
        headers: {
            ...init?.headers,
        },
    });

    if (response.status === 401) {
        await signOut();
    }

    return response;
}