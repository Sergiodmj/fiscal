"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
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
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [busca, setBusca] = useState("");
  const [visivel, setVisivel] = useState("tabela");
  const [pagamento, setPagamento] = useState<any>(data.data2.payments);
  const [pagamentoId, setPagamentoId] = useState("");
  const [data1, setData1] = useState(data.data.debts);
  const [numero, setNumero] = useState(2);
  const [fornecedor, setFornecedor] = useState([]);
  const [fornecedorId, setFornecedorId] = useState("");
  const [banco, setBanco] = useState([]);
  const [bancoId, setBancoId] = useState("");
  console.log(pagamento);

  const fetchData1 = async () => {
    const response = await fetch("https://erp.sitesdahora.com.br/api/debts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();

    setData1(data.debts);
  };

  const fetchData3 = async () => {
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
    setPagamento(data.payments);
  };

  useEffect(() => {
    fetchData1();
    // fetchData2();
    fetchData3();
    // fetchData4();
  }, []);

  // const result = fornecedor.map((item: any) => ({
  //   label: `${item.nome_client}`,
  //   id: item.id,
  // }));

  // const result2 = banco.map((item: any) => ({
  //   label: `${item.name_bank}`,
  //   id: item.id,
  // }));

  const result3 = pagamento.map((item: any) => ({
    label: `${item.name_payments}`,
    id: item.id,
  }));

  console.log(result3);

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

  const inativar = { debt_status: "INATIVO" };
  const ativar = { debt_status: "ATIVO" };

  // const buscaFiltrada1 = useMemo(() => {
  //   const lowerBusca = busca.toLowerCase();
  //   return data1.filter((data1: any) =>
  //     data1.name_payments.toLowerCase().includes(lowerBusca)
  //   );
  // }, [busca, data1]);

  async function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    if (pagamento === "") {
      const result = async () => {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/payment-create",
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
          `https://erp.sitesdahora.com.br/api/payment-edit/${pagamento.id}`,
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
              setPagamento("");
              setVisivel("formulario");
            }}
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Novo Registro
          </Button>
        </Grid>
        {/* <Card
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
                          <TableCell>TIPO</TableCell>
                          <TableCell> </TableCell>
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
                            <TableCell component="th" scope="row">
                              {row.type_payments}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.status_ncm}
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
                                      `https://erp.sitesdahora.com.br/api/payment-status/${row.id}`,
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
                          <TableCell>TIPO</TableCell>
                          <TableCell> </TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? buscaFiltrada2.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : data2
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
                            <TableCell component="th" scope="row">
                              {row.type_payments}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.status_ncm}
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

                              <Tooltip title="HABILITAR">
                                <Button
                                  onClick={async () => {
                                    const response = await fetch(
                                      `https://erp.sitesdahora.com.br/api/payment-status/${row.id}`,
                                      {
                                        cache: "no-cache",
                                        method: "PUT",
                                        body: JSON.stringify(ativar),
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
                                    add
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
        </Card> */}
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
                  Novo registro
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
                      id="name_debit"
                      name="name_debit"
                      required
                      defaultValue={pagamento.name_debit}
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Número da nota"
                      variant="filled"
                      id="number_note"
                      name="number_note"
                      defaultValue={pagamento.number_note}
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Banco do cheque"
                      variant="filled"
                      id="banck_transmitter_cheque"
                      name="banck_transmitter_cheque"
                      defaultValue={pagamento.banck_transmitter_cheque}
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Número d ocheque"
                      variant="filled"
                      id="number_check"
                      name="number_check"
                      defaultValue={pagamento.number_check}
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Valor total"
                      variant="filled"
                      id="value_total_debit"
                      name="value_total_debit"
                      required
                      defaultValue={pagamento.value_total_debit}
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
                    {numero == 1 ? (
                      <Box>
                        Para parcela em Dias utilizar o "/" Ex: 30/60. parcela
                        para 30 e 60 dias. Para meses basta colocar a quantidade
                        de meses que ira parcela.
                      </Box>
                    ) : (
                      ""
                    )}
                    <TextField
                      onFocus={() => {
                        setNumero(1);
                      }}
                      onBlur={() => {
                        setNumero(2);
                      }}
                      label="Parcela"
                      variant="filled"
                      id="parcel"
                      name="parcel"
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Data de Pagamento"
                      variant="filled"
                      type="date"
                      id="date_payment"
                      name="date_payment"
                      defaultValue={pagamento.date_payment}
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Valor do Pagamento"
                      variant="filled"
                      id="value_paid"
                      name="value_paid"
                      defaultValue={pagamento.value_paid}
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Descrição"
                      variant="filled"
                      id="description"
                      name="description"
                      defaultValue={pagamento.description}
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      options={result3}
                      onChange={(event: any, newValue: any | null) => {
                        setPagamentoId(newValue.id);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Formas de Pagamento"
                          required
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="Banco ID"
                      variant="filled"
                      id="description"
                      name="description"
                      defaultValue={pagamento.description}
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <FormControl fullWidth>
                    <TextField
                      label="provider ID"
                      variant="filled"
                      id="description"
                      name="description"
                      defaultValue={pagamento.description}
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
