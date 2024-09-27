import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";

export default async function CadEmpresa() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != 'ADM') {
    redirect("/page/unauthorized");
  }
  
  return (
    <>
      <h1>Cadastro de empresa</h1>
    </>
  );
}
