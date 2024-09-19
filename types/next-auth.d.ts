/* eslint-disable prettier/prettier */
import nextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            [x: string]: any;
            status: string | undefined | unknown,
            token: string | undefined | unknown,
            permission: string | undefined | unknown,

        }
    }
    interface User {
        status: string | undefined,
        token: string | undefined,
        permission: string | undefined | unknown,

    }
}

declare module "next-auth" {
    interface jwt {
        status: string | undefined,
        token: string | undefined,
        permission: string | undefined | unknown,

    }
}