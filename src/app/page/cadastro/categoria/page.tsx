import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import Link from "next/link";
import { Button, Grid, Tab, TableCell, TableHead } from "@mui/material";
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
import { TabContext, TabList } from "@mui/lab";
import LabTabs from "./LabTabs";

export default async function Categoria() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "ADMINISTRADOR") {
    redirect("/page/unauthorized");
  }

  const jwt = seesion?.user.token;

  const res = await fetch("https://erp.sitesdahora.com.br/api/categories", {
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

  const res2 = await fetch(
    "https://erp.sitesdahora.com.br/api/categories-inactive",
    {
      cache: "no-cache",
      next: {
        tags: ["tabela-categoria2"],
      },
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
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Link href={"/page/cadastro/categoria/novo"}>
          <Button
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Nova Categoria
          </Button>
        </Link>
      </Grid>

      <LabTabs />
      
      
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
          Categorias Ativas
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
                <TableCell>Status</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.categorys.map((category: any) => {
                return (
                  <TableRow key={category.id}>
                    <TableCell>{category.name_category}</TableCell>
                    <TableCell>{category.status_category}</TableCell>
                    <TableCell>
                      <Link
                        href={{
                          pathname: "/page/cadastro/categoria/novo",
                          query: category,
                        }}
                      >
                        <Button>
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Button>
                      </Link>
                      <FormDialog category={category} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

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
          Categorias Inativas
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
                <TableCell>Status</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data2.categorys.map((category: any) => {
                return (
                  <TableRow key={category.id}>
                    <TableCell>{category.name_category}</TableCell>
                    <TableCell>{category.status_category}</TableCell>
                    <TableCell>
                      <Link
                        href={{
                          pathname: "/page/cadastro/categoria/novo",
                          query: category,
                        }}
                      >
                        <Button>
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </Button>
                      </Link>
                      <FormDialog category={category} />
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
