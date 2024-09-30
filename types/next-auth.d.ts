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
        enterprise_id: string | undefined,
        token: string | undefined,
        permission: string | undefined | unknown,

    }
}

declare module "next-auth" {
    interface jwt {
        enterprise_id: string | undefined,
        token: string | undefined,
        permission: string | undefined | unknown,

    }
}