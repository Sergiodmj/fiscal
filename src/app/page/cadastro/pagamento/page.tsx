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

  const res = await fetch("https://erp.sitesdahora.com.br/api/payments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();

  const res2 = await fetch(
    "https://erp.sitesdahora.com.br/api/payments-inativo",
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

"SQLSTATE[01000]: Warning: 1265 Data truncated for column 'type_payments' at row 1 (Connection: mysql, SQL: insert into `forms_payments` (`name_payments`, `type_payments`, `enterprise_id`, `updated_at`, `created_at`) values (Maquina Sicredi, Crédito 30 dias, 12, 2024-11-12 18:25:15, 2024-11-12 18:25:15))";
