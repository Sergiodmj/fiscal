import { getServerSession } from "next-auth"
import { auth as authOptions } from "@/app/libs/auth-config"


export default async function Home() {
    const seesion = await getServerSession(authOptions)
    return (
      <>
        <h1>Home</h1>

        {seesion && <div>{JSON.stringify(seesion)}</div>}
      </>
    );
}