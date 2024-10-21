import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import Link from "next/link";
import { Button, Grid } from "@mui/material";

import LabTabs from "./LabTabs";
import CustomPaginationActions from "./CustomPaginationActions";

export default async function uniMedida() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "ADMINISTRADOR") {
    redirect("/page/unauthorized");
  }

  const jwt = seesion?.user.token;

  const res = await fetch("https://erp.sitesdahora.com.br/api/units", {
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
  

  const res2 = await fetch("https://erp.sitesdahora.com.br/api/units-inative", {
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
        <Link href={"/page/cadastro/uniMedida/novo"}>
          <Button
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Nova Unidade de medida
          </Button>
        </Link>
      </Grid>

      <CustomPaginationActions data={data} data2={data2} />
    </>
  );
}
