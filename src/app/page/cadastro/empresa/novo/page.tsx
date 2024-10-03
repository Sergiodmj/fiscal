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

export default async function TextualInputs(user: any) {
  const seesion = await getServerSession(authOptions);
  if (!seesion) {
    redirect("/");
  }
  if (seesion?.user.permission != "SUPER_ADMIN") {
    redirect("/page/unauthorized");
  }

  const jwt = seesion?.user.token;

  async function Salvar(form: FormData) {  
    "use server";
    const data = Object.fromEntries(form);
    console.log(JSON.stringify(data));
    if (!user.searchParams.id) {
      const url = "https://erp.sitesdahora.com.br/api/enterprise-create";
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
    } else {
      const url = `https://erp.sitesdahora.com.br/api/enterprise-edit-super/${user.searchParams.id}`;
      const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      };
      const response = await fetch(url, options);
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
                Nova Empresa
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
                    label="Nome da empresa"
                    variant="filled"
                    id="name_enterprise"
                    name="name_enterprise"
                    required
                    defaultValue={user.searchParams.name_enterprise}
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
                    label="CNPJ / CPF"
                    variant="filled"
                    id="cpf_cnpj_enterprise"
                    name="cpf_cnpj_enterprise"
                    required
                    defaultValue={user.searchParams.cpf_cnpj_enterprise}
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
                    id="rg_ie_enterprise"
                    name="rg_ie_enterprise"
                    defaultValue={user.searchParams.rg_ie_enterprise}
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
                    label="Endereço"
                    variant="filled"
                    id="address_enterprise"
                    name="address_enterprise"
                    defaultValue={user.searchParams.address_enterprise}
                    required
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
                    id="number_enterprise"
                    name="number_enterprise"
                    defaultValue={user.searchParams.number_enterprise}
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
                    label="CEP"
                    variant="filled"
                    id="cep_enterprise"
                    name="cep_enterprise"
                    defaultValue={user.searchParams.cep_enterprise}
                    required
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
                    id="city_enterprise"
                    name="city_enterprise"
                    defaultValue={user.searchParams.city_enterprise}
                    required
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
                    id="state_enterprise"
                    name="state_enterprise"
                    defaultValue={user.searchParams.state_enterprise}
                    required
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

              {!user.searchParams.id ? (
                <Grid item xs={12} md={12} lg={12} xl={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Validade"
                      placeholder="ano/mes/dia"
                      variant="filled"
                      id="validade"
                      name="validade"
                      required
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
              ) : (
                ""
              )}
            </Grid>
          </Card>

          {!user.searchParams.id ? (
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
                  Dados do Login
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
                      id="name"
                      name="name"
                      defaultValue={user.searchParams.name}
                      required
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
                      id="email"
                      name="email"
                      defaultValue={user.searchParams.email}
                      required
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
                      label="Senha"
                      variant="filled"
                      id="password"
                      name="password"
                      defaultValue={user.searchParams.password}
                      required
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
                    <TextField
                      variant="filled"
                      id="level"
                      name="level"
                      type="hidden"
                      value="ADMINISTRADOR"
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
          ) : (
            ""
          )}

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
                <Link href={"/page/cadastro/empresa"}>
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
