import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import Link from "next/link";
import { Button, Grid } from "@mui/material";

import LabTabs from "./LabTabs";

export default async function Cliente() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }

  const jwt = seesion?.user.token;

  const res = await fetch("https://erp.sitesdahora.com.br/api/clients", {
    // cache: "no-cache",
    next: {
      tags: ["tabela-categoria"],
    },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();

  const res2 = await fetch("https://erp.sitesdahora.com.br/api/providers", {
    // cache: "no-cache",
    next: {
      tags: ["tabela-categoria2"],
    },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data2 = await res2.json();


  return (
    <>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Link href={"/page/cadastro/cliente-fornecedor/novo"}>
          <Button
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Novo cliente / fornecedor
          </Button>
        </Link>
      </Grid>

      <LabTabs data={data} data2={data2} />
    </>
  );
}
