import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/app/libs/auth-config";
import { redirect } from "next/navigation";
import BasicBadge from "./BasicBadge";
import { Grid } from "@mui/material";
import Link from "next/link";

export default async function Home() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }

  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={2} md={2} lg={2} xl={2}>
          <Link href={"/page/compra"}>
            <BasicBadge nome="Venda" icon="Sell" />
          </Link>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2}>
          <Link href={"/page/cadastro/banco"}>
            <BasicBadge nome="Compra" icon="Shopping_cart" />
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

//Link para os ícones, inserir apenas o nome do ícone.
//https://fonts.google.com/icons?selected=Material+Symbols+Outlined:shopping_cart:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=shop&icon.size=24&icon.color=%23e8eaed
