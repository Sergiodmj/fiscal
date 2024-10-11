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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { auth as authOptions } from "@/app/libs/auth-config";

import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TextualInputs(client: any) {
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
    if (!client.searchParams.id) {
      const url = "https://erp.sitesdahora.com.br/api/client-create";
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await fetch(url, options);

      if (response.status === 200) {
        redirect("/page/cadastro/cliente-fornecedor");
      }
    } else {
      const url = `https://erp.sitesdahora.com.br/api/client-edit/${client.searchParams.id}`;
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
        redirect("/page/cadastro/cliente-fornecedor");
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
                Novo Cliente / Fornecedor
              </Typography>
            </Box>

            <Grid
              container
              spacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
            >
              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Tipo
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="type_partner"
                  >
                    <FormControlLabel
                      value="CLIENTE"
                      control={<Radio className="dark-radio" />}
                      label="Cliente"
                    />
                    <FormControlLabel
                      value="FORNECEDOR"
                      control={<Radio className="dark-radio" />}
                      label="Fornecedor"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="type_client"
                  >
                    <FormControlLabel
                      value="PF"
                      control={<Radio className="dark-radio" />}
                      label="PF"
                    />
                    <FormControlLabel
                      value="PJ"
                      control={<Radio className="dark-radio" />}
                      label="PJ"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Nome"
                    variant="filled"
                    id="nome_client"
                    name="nome_client"
                    required
                    defaultValue={client.searchParams.nome_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Telefone"
                    variant="filled"
                    id="fone_client"
                    name="fone_client"
                    required
                    defaultValue={client.searchParams.fone_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="CPF / CNPJ"
                    variant="filled"
                    id="cpf_cnpj_client"
                    name="cpf_cnpj_client"
                    required
                    defaultValue={client.searchParams.cpf_cnpj_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Aniversário"
                    variant="filled"
                    id="date_birth_client"
                    name="date_birth_client"
                    required
                    defaultValue={client.searchParams.date_birth_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="RG / IE"
                    variant="filled"
                    id="rg_ie_client"
                    name="rg_ie_client"
                    required
                    defaultValue={client.searchParams.rg_ie_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Emdereço"
                    variant="filled"
                    id="address_client"
                    name="address_client"
                    required
                    defaultValue={client.searchParams.address_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Número"
                    variant="filled"
                    id="number_client"
                    name="number_client"
                    required
                    defaultValue={client.searchParams.number_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Cidade"
                    variant="filled"
                    id="city_client"
                    name="city_client"
                    required
                    defaultValue={client.searchParams.city_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Estado"
                    variant="filled"
                    id="state_client"
                    name="state_client"
                    required
                    defaultValue={client.searchParams.state_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    variant="filled"
                    id="email_client"
                    name="email_client"
                    required
                    defaultValue={client.searchParams.email_client}
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

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="OBS"
                    variant="filled"
                    id="observation_client"
                    name="observation_client"
                    defaultValue={client.searchParams.observation_client}
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
                <Link href={"/page/cadastro/cliente-fornecedor"}>
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
