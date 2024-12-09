import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import CustomPaginationActions from "./CustomPaginationActions";

export default async function Produto() {
  const seesion = await getServerSession(authOptions);

  if (!seesion) {
    redirect("/");
  }

  const jwt = seesion?.user.token;

  const res = await fetch("https://erp.sitesdahora.com.br/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();

  const res2 = await fetch(
    "https://erp.sitesdahora.com.br/api/products-inactive",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  const data2 = await res2.json();

  return (
    <>
      <CustomPaginationActions data={data} data2={data2} />
    </>
  );
}
