import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { auth as authOptions } from "@/app/libs/auth-config";
import {
  Card,
  Typography
} from "@mui/material";
import CustomPaginationActions from "./CustomPaginationActions";

export default async function Empresa() {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }

  const jwt = seesion?.user.token;

  const res = await fetch("https://systemcode.sitesdahora.com.br/api/companys", {
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
  // console.log(data.companey);

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
          Empresas
        </Typography>

        <CustomPaginationActions data={data}/>
      </Card>
    </>
  );
}
