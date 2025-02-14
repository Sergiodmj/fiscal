import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import CustomPaginationActions from "./CustomPaginationActions";

export default async function Pagamento() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "ADMINISTRADOR") {
    redirect("/page/unauthorized");
  }

  const jwt = seesion?.user.token;

  const res = await fetch("https://erp.sitesdahora.com.br/api/stocks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();

  return (
    <>
      <CustomPaginationActions data={data} />
    </>
  );
}