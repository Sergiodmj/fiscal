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

export default async function TableActivate() {
  const seesion = await getServerSession(authOptions);
  
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
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
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
                      <span className="material-symbols-outlined">edit</span>
                    </Button>
                  </Link>
                  <FormDialog category={category} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
