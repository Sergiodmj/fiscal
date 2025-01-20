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
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
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
  const [pagamento, setPagamento] = React.useState<any>("");
  const [data1, setData1] = React.useState(data.data.payments);
  const [data2, setData2] = React.useState(data.data2.payments);
  const [internal, setInternal] = React.useState("0");

  const fetchData1 = async () => {
    const response = await fetch(
      "https://erp.sitesdahora.com.br/api/payments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await response.json();
    setData1(data.payments);
  };

  const fetchData2 = async () => {
    const response = await fetch(
      "https://erp.sitesdahora.com.br/api/payments-inativo",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await response.json();
    setData2(data.payments);
    console.log(data2);
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
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

  const inativar = { status_payment: "INATIVO" };
  const ativar = { status_payment: "ATIVO" };

  const buscaFiltrada1 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data1.filter((data1: any) =>
      data1.name_payments.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data1]);

  const buscaFiltrada2 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data2.filter((data2: any) =>
      data2.name_payments.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data2]);

  async function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    if (pagamento === "") {
      const result = async () => {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/payment-create",
          {
            method: "POST",
            body: JSON.stringify({
              name_payments: data.name_payments,
              type_payments: data.type_payments,
              internal_payment: internal,
            }),
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
          `https://erp.sitesdahora.com.br/api/payment-edit/${pagamento.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name_payments: data.name_payments,
              type_payments: data.type_payments,
              internal_payment: internal,
            }),
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
              setPagamento("");
              setVisivel("formulario");
            }}
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Novo método de pagamento
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
            Método de Pagamento
          </Typography>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Ativo" value="1" sx={{ fontWeight: "600" }} />
                  <Tab label="Inativo" value="2" sx={{ fontWeight: "600" }} />
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
                              {row.name_payments}
                            </TableCell>

                            <TableCell style={{ width: 160 }} align="right">
                              <Tooltip title="EDITAR">
                                <Button
                                  onClick={() => {
                                    setPagamento(row);
                                    setVisivel("formulario");
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    edit
                                  </span>
                                </Button>
                              </Tooltip>

                              <Tooltip title="INABILITAR">
                                <Button
                                  onClick={async () => {
                                    const response = await fetch(
                                      `https://erp.sitesdahora.com.br/api/ncm-edit-status/${row.id}`,
                                      {
                                        cache: "no-cache",
                                        method: "PUT",
                                        body: JSON.stringify(inativar),
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization: `Bearer ${jwt}`,
                                        },
                                      }
                                    );
                                    const mensagem = await response.json();
                                    if (mensagem.success === true) {
                                      toast.success("Inabilitado com Sucesso", {
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
                                    }
                                    fetchData2();
                                    fetchData1();
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    remove
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
                  Nova forma de pagamento
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
                      id="name_payments"
                      name="name_payments"
                      required
                      defaultValue={pagamento.name_payments}
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
                      label="Forma de Pagamento"
                      variant="filled"
                      id="type_payments"
                      name="type_payments"
                      required
                      defaultValue={pagamento.type_payments}
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
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Tipo de pagamento
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="manage_stock"
                      defaultValue={pagamento.internal_payment || internal}
                    >
                      <FormControlLabel
                        value="0"
                        onClick={() => {
                          setInternal("0");
                        }}
                        control={<Radio className="dark-radio" />}
                        label="Pagamento de cliente"
                      />
                      <FormControlLabel
                        value="1"
                        onClick={() => {
                          setInternal("1");
                        }}
                        control={<Radio className="dark-radio" />}
                        label="Pagamento ao fornnecedor"
                      />
                    </RadioGroup>
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
