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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSession } from "next-auth/react";
import { TabContext } from "@mui/lab";
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
  const [user, setUser] = React.useState<any>();
  const [data1, setData1] = React.useState(data.data.users);

  const fetchData = async () => {
    const response = await fetch("https://erp.sitesdahora.com.br/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();
    setData1(data.users);
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
      data1.name.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data1]);

  async function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    if (user === "") {
      const result = async () => {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/user-create",
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
      result();
    } else {
      const result = async () => {
        const response = await fetch(
          `https://erp.sitesdahora.com.br/api/user-edit/${user.id}`,
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
      result();
    }
  }

  if (visivel === "tabela") {
    return (
      <>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Button
            onClick={() => {
              setUser("");
              setVisivel("formulario");
            }}
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Novo Usuário
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
            Usuários
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
                        <TableCell>Email</TableCell>
                        <TableCell>Função</TableCell>
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
                            {row.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.email}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.level}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            <Tooltip title="EDITAR">
                              <Button
                                onClick={() => {
                                  setUser(row);
                                  setVisivel("formulario");
                                }}
                              >
                                <span className="material-symbols-outlined">
                                  edit
                                </span>
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          colSpan={5}
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
                  Novo Usuario
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
                      required
                      defaultValue={user.name}
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
                      label="Email"
                      variant="filled"
                      id="email"
                      name="email"
                      required
                      defaultValue={user.email}
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

                {user === "" ? (
                  <>
                    <Grid item xs={12} md={4} lg={4} xl={4}>
                      <FormControl fullWidth>
                        <TextField
                          label="Senha"
                          variant="filled"
                          id="password"
                          name="password"
                          required
                          defaultValue={user.password}
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
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel>Função</InputLabel>
                          <Select
                            labelId="level"
                            id="level"
                            name="level"
                            label="Funcao"
                            required
                            sx={{
                              "& fieldset": {
                                border: "1px solid #D5D9E2",
                                borderRadius: "7px",
                              },
                            }}
                          >
                            <MenuItem value="ADMINISTRADOR">
                              Administrador
                            </MenuItem>
                            <MenuItem value="FUNCIONARIO">Funcionário</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </>
                ) : (
                  ""
                )}
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
                  <Button
                    onClick={() => {
                      setUser("");
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
