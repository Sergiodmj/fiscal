import { getServerSession } from "next-auth"
import { auth as authOptions } from "@/app/libs/auth-config"
import { redirect } from "next/navigation";


export default async function Home() {
  const seesion = await getServerSession(authOptions)
  if (!seesion) {
    redirect("/")
  }

  console.log(seesion)
    return (
      <>
        <h1>Home</h1>

        {seesion && <div>{JSON.stringify(seesion)}</div>}
      </>
    );
}