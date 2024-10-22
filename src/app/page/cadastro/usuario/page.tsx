import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import Link from "next/link";
import { Button, Grid, TableCell, TableHead, Tooltip } from "@mui/material";
import {
  Card,
  Typography,
  Table,
  TableBody,
  TableContainer,
  Box,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from "@mui/material";
import CustomPaginationActions from "./CustomPaginationActions";

export default async function Usuario() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "ADMINISTRADOR") {
    redirect("/page/unauthorized");
  }

  const jwt = seesion?.user.token;

  const res = await fetch("https://erp.sitesdahora.com.br/api/users", {
    cache: "no-cache",
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

  return (
    <>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Link href={"/page/cadastro/usuario/novo"}>
          <Button
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Novo Usuário
          </Button>
        </Link>
      </Grid>

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "7px",
          mb: "25px",
          padding: { xs: "18px", sm: "20px", lg: "25px" },
        }}
        className="rmui-card"
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
            mb: "25px",
          }}
          className="text-black"
        >
          Usuários
        </Typography>
        <CustomPaginationActions data={data} />
      </Card>
    </>
  );
}
