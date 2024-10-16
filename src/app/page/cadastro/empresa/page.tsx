import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import Link from "next/link";
import { Button, Grid, TableCell, TableHead } from "@mui/material";
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
import FormDialog from "./FormDialog";
import { format } from "date-fns";

export default async function Empresa() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "SUPER_ADMIN") {
    redirect("/page/unauthorized");
  }

  const jwt = seesion?.user.token;

  const res = await fetch("https://erp.sitesdahora.com.br/api/enterprises", {
    cache: "no-cache",
    next: {
      tags: ["tabela-cliente"],
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
        <Link href={"/page/cadastro/empresa/novo"}>
          <Button
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Nova Empresa
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
          Empresas
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  th: {
                    fontSize: "15px",
                    color: "red",
                  },
                }}
              >
                <TableCell>Nome</TableCell>
                <TableCell>CPF / CNPM</TableCell>
                <TableCell>Cidde</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Vencimento</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.profile.map((user: any) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.name_enterprise}</TableCell>
                    <TableCell>{user.cpf_cnpj_enterprise}</TableCell>
                    <TableCell>{user.city_enterprise}</TableCell>
                    <TableCell>
                      {user.state_enterprise}
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.validade), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={{
                          pathname: "/page/cadastro/empresa/novo",
                          query: user,
                        }}
                      >
                        <Button>
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Button>
                      </Link>
                      <FormDialog user={user} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
