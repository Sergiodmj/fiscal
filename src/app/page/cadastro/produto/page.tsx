import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";

export default async function CadProduto() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  return (
    <>
      <h1>Cadastro de produto</h1>
    </>
  );
}
