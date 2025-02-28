/* eslint-disable prettier/prettier */
import nextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            [x: string]: any;
            enterprise_id: string | undefined | unknown,
            token: string | undefined | unknown,
            permission: string | undefined | unknown,

        }
    }
    interface User {
        token: string | undefined,
        username: string | undefined | unknown,
        email_verified_at: string | undefined | unknown,
        type_user: string | undefined | unknown,
        status: string | undefined | unknown,
        user_id: string | undefined | unknown,

    }
}

declare module "next-auth" {
    interface jwt {
        token: string | undefined,
        username: string | undefined | unknown,
        email_verified_at: string | undefined | unknown,
        type_user: string | undefined | unknown,
        status: string | undefined | unknown,
        user_id: string | undefined | unknown,

    }
}