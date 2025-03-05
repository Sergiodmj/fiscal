"use client";

import React, { useEffect, useMemo } from "react";
import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Box,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  TableHead,
  Tooltip,
  Button,
  Grid,
  FormControl,
  TextField,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSession } from "next-auth/react";
import { TabContext } from "@mui/lab";
import { format } from "date-fns";
import FormDialog from "./FormDialog";
import { Flip, toast } from "react-toastify";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActions(data: any) {
  const { data: session } = useSession();
  const jwt = session?.user.token;
  const [value, setValue] = React.useState("1");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [busca, setBusca] = React.useState("");
  const [visivel, setVisivel] = React.useState("tabela");
  const [profile, setProfile] = React.useState<any>();
  const [data1, setData1] = React.useState(data.data.profile);

  const fetchData = async () => {
    const response = await fetch(
      "https://erp.sitesdahora.com.br/api/enterprises",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await response.json();
    setData1(data.profile);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const buscaFiltrada1 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data1.filter((data1: any) =>
      data1.name_enterprise.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data1]);

  async function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    if (profile === "") {
      const result = async () => {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/enterprise-create",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const mensage = await response.json();
        console.log(mensage);
        if (mensage.success === true) {
          fetchData();
          toast.success(`${mensage.message}`, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
          setVisivel("tabela");
        } else {
          toast.error(`${mensage.erros}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
        }
      };
      // result();
    } else {
      const result = async () => {
        const response = await fetch(
          `https://erp.sitesdahora.com.br/api/enterprise-edit-super/${profile.id}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const mensage = await response.json();
        console.log(mensage);
        if (mensage.success === true) {
          fetchData();
          toast.success("Alterado com sucesso", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
          setVisivel("tabela");
        } else {
          toast.error("Erro ao Salvar dados", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
        }
      };
      // result();
    }
  }

  if (visivel === "tabela") {
    return (
      <>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Button
            onClick={() => {
              setProfile("");
              setVisivel("formulario");
            }}
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Nova Empresa
          </Button>
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
            Unidade de Medida
          </Typography>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TableContainer component={Paper}>
                  <Grid item xs={12} md={12} lg={12} xl={6}>
                    <FormControl>
                      <TextField
                        label={
                          <span className="material-symbols-outlined">
                            search
                          </span>
                        }
                        value={busca}
                        onChange={(ev) => setBusca(ev.target.value)}
                        variant="standard"
                        id="barcode"
                        type="search"
                      />
                    </FormControl>
                  </Grid>
                  <Table
                    sx={{ minWidth: 500 }}
                    aria-label="custom pagination table"
                  >
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
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? buscaFiltrada1.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data1
                      ).map((row: any) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "th, td": {
                              fontSize: "15px",
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name_enterprise}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.cpf_cnpj_enterprise}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.city_enterprise}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.state_enterprise}
                          </TableCell>
                          <TableCell>
                            {format(new Date(row.validade), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            <Tooltip title="EDITAR">
                              <Button
                                onClick={() => {
                                  setProfile(row);
                                  setVisivel("formulario");
                                }}
                              >
                                <span className="material-symbols-outlined">
                                  edit
                                </span>
                              </Button>
                            </Tooltip>
                            <FormDialog user={row} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          colSpan={6}
                          count={buscaFiltrada1.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Box>
            </TabContext>
          </Box>
        </Card>
      </>
    );
  } else {
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
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Nome da empresa"
                      variant="filled"
                      id="name_enterprise"
                      name="name_enterprise"
                      required
                      defaultValue={profile.name_enterprise}
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

                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="CNPJ / CPF"
                      variant="filled"
                      id="cpf_cnpj_enterprise"
                      name="cpf_cnpj_enterprise"
                      required
                      defaultValue={profile.cpf_cnpj_enterprise}
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

                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="RG / IE"
                      variant="filled"
                      id="rg_ie_enterprise"
                      name="rg_ie_enterprise"
                      defaultValue={profile.rg_ie_enterprise}
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

                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Endereço"
                      variant="filled"
                      id="address_enterprise"
                      name="address_enterprise"
                      defaultValue={profile.address_enterprise}
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

                <Grid item xs={12} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <TextField
                      label="Número"
                      variant="filled"
                      id="number_enterprise"
                      name="number_enterprise"
                      defaultValue={profile.number_enterprise}
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

                <Grid item xs={12} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <TextField
                      label="CEP"
                      variant="filled"
                      id="cep_enterprise"
                      name="cep_enterprise"
                      defaultValue={profile.cep_enterprise}
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

                <Grid item xs={12} md={5} lg={5} xl={5}>
                  <FormControl fullWidth>
                    <TextField
                      label="Cidade"
                      variant="filled"
                      id="city_enterprise"
                      name="city_enterprise"
                      defaultValue={profile.city_enterprise}
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

                <Grid item xs={12} md={4} lg={4} xl={4}>
                  <FormControl fullWidth>
                    <TextField
                      label="Estado"
                      variant="filled"
                      id="state_enterprise"
                      name="state_enterprise"
                      defaultValue={profile.state_enterprise}
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

                {profile === "" ? (
                  <Grid item xs={12} md={3} lg={3} xl={3}>
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

            {profile === "" ? (
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
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <FormControl fullWidth>
                      <TextField
                        label="Nome"
                        variant="filled"
                        id="name"
                        name="name"
                        defaultValue={profile.name}
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

                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Email"
                        variant="filled"
                        id="email"
                        name="email"
                        defaultValue={profile.email}
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

                  <Grid item xs={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Senha"
                        variant="filled"
                        id="password"
                        name="password"
                        defaultValue={profile.password}
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
                  <Button
                    onClick={() => {
                      setProfile("");
                      setVisivel("tabela");
                    }}
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
                </Grid>
              </Grid>
            </Card>
          </Box>
        </form>
      </>
    );
  }
}
