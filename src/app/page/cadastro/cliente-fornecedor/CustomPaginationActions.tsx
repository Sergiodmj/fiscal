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
  Tab,
  Grid,
  FormControl,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSession } from "next-auth/react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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
  const [cliente, setCliente] = React.useState<any>();
  const [data1, setData1] = React.useState(data.data.clients);
  const [data2, setData2] = React.useState(data.data2.providers);

  const fetchData1 = async () => {
    const response = await fetch("https://erp.sitesdahora.com.br/api/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();
    setData1(data.clients);
  };

  const fetchData2 = async () => {
    const response = await fetch(
      "https://erp.sitesdahora.com.br/api/providers",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await response.json();
    setData2(data.providers);
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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
      data1.nome_client.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data1]);

  const buscaFiltrada2 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data2.filter((data2: any) =>
      data2.nome_client.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data2]);

  function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    if (cliente === "") {
      const result = async () => {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/client-create",
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
          fetchData1();
          fetchData2();
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
          `https://erp.sitesdahora.com.br/api/client-edit/${cliente.id}`,
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
          fetchData1();
          fetchData2();
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
          toast.error(`${mensage.message}`, {
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
              setCliente("");
              setVisivel("formulario");
            }}
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Novo cliente / fornecedor
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
            Cliente / Fornecedor
          </Typography>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Cliente" value="1" sx={{ fontWeight: "600" }} />
                  <Tab
                    label="fornecedor"
                    value="2"
                    sx={{ fontWeight: "600" }}
                  />
                </TabList>

                <TabPanel value="1">
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
                          <TableCell>Telefone</TableCell>
                          <TableCell>CPF / CNPJ</TableCell>
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
                              {row.nome_client}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {row.fone_client}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {row.cpf_cnpj_client}
                            </TableCell>

                            <TableCell style={{ width: 160 }} align="right">
                              <Tooltip title="EDITAR">
                                <Button
                                  onClick={() => {
                                    setCliente(row);
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
                </TabPanel>

                <TabPanel value="2">
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
                          <TableCell>Telefone</TableCell>
                          <TableCell>CPF / CNPJ</TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? buscaFiltrada2.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : buscaFiltrada2
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
                              {row.nome_client}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {row.fone_client}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {row.cpf_cnpj_client}
                            </TableCell>

                            <TableCell style={{ width: 160 }} align="right">
                              <Tooltip title="EDITAR">
                                <Button
                                  onClick={() => {
                                    setCliente(row);
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
                            count={buscaFiltrada2.length}
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
                </TabPanel>
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
                      defaultValue={cliente.type_partner}
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
                      defaultValue={cliente.type_client}
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
                      defaultValue={cliente.nome_client}
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
                      defaultValue={cliente.fone_client}
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
                      defaultValue={cliente.cpf_cnpj_client}
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
                      defaultValue={cliente.date_birth_client}
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
                      defaultValue={cliente.rg_ie_client}
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
                      defaultValue={cliente.address_client}
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
                      defaultValue={cliente.number_client}
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
                      defaultValue={cliente.city_client}
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
                      defaultValue={cliente.state_client}
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
                      defaultValue={cliente.email_client}
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
                      defaultValue={cliente.observation_client}
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
                  <Button
                    onClick={() => {
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
