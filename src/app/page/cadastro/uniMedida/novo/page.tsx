import {
  Grid,
  Card,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/app/libs/auth-config";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TextualInputs(unit: any) {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "ADMINISTRADOR") {
    redirect("/page/unauthorized");
  }

  const jwt = seesion?.user.token;

  async function Salvar(form: FormData) {
    "use server";
    const data = Object.fromEntries(form);
    if (!unit.searchParams.id) {
      const url = "https://erp.sitesdahora.com.br/api/unit-create";
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await fetch(url, options);
      // console.log(response);

      if (response.status === 200) {
        redirect("/page/cadastro/uniMedida");
      }
        console.log(response);


    } else {
      const url = `https://erp.sitesdahora.com.br/api/unit-edit/${unit.searchParams.id}`;
      const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await fetch(url, options);
      console.log(response);
      if (response.status === 200) {
        redirect("/page/cadastro/uniMedida");
      }
    }
  }

  return (
    <>
      <form action={Salvar}>
        <Box>
          <Card
            sx={{
              boxShadow: "none",
              borderRadius: "7px",
              mb: "25px",
              padding: { xs: "18px", sm: "20px", lg: "25px" },
            }}
            className="rmui-card"
          >
            <Box
              sx={{
                mb: "25px",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 700,
                }}
                className="text-black"
              >
                Nova Categoria
              </Typography>
            </Box>

            <Grid
              container
              spacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
            >
              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Nome"
                    variant="filled"
                    id="name_unit"
                    name="name_unit"
                    required
                    defaultValue={unit.searchParams.name_unit}
                    sx={{
                      "& .MuiInputBase-root": {
                        border: "1px solid #D5D9E2",
                        backgroundColor: "#fff",
                        borderRadius: "7px",
                      },
                      "& .MuiInputBase-root::before": {
                        border: "none",
                      },
                      "& .MuiInputBase-root:hover::before": {
                        border: "none",
                      },
                    }}
                  />
                </FormControl>
              </Grid>

            </Grid>
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
            <Grid
              container
              spacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
            >
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "6px",
                    fontWeight: "500",
                    fontSize: "16px",
                    padding: "10px 24px",
                    color: "#fff !important",
                    boxShadow: "none",
                    display: "block",
                    width: "100%",
                  }}
                >
                  Salvar
                </Button>
              </Grid>

              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Link href={"/page/cadastro/uniMedida"}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "6px",
                      fontWeight: "500",
                      fontSize: "16px",
                      padding: "10px 24px",
                      color: "#fff !important",
                      boxShadow: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    Cancelar
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </form>
    </>
  );
}

// export default TextualInputs;
