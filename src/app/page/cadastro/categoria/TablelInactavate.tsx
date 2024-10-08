import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FormDialog from "./FormDialog";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import Link from "next/link";

import { getServerSession } from "next-auth";

export default async function TableInactivate() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "ADMINISTRADOR") {
    redirect("/page/unauthorized");
  }

  const jwt = seesion?.user.token;

  const res = await fetch(
    "https://erp.sitesdahora.com.br/api/categories-inactive",
    {
      cache: "no-cache",
      next: {
        tags: ["tabela-categoria"],
      },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  const data = await res.json();
  return (
    <>
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
    </>
  );
}
