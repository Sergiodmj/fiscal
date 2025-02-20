"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Typography,
  Box,
  Paper,
  Grid,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  FormLabel,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Tab,
  Table,
  TableBody,
  Tooltip,
  TableFooter,
  TablePagination,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useSession } from "next-auth/react";
import Link from "next/link";
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
  const [produto, setProduto] = useState([]);
  const [value, setValue] = React.useState("1");
  const [busca, setBusca] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [page, setPage] = React.useState(0);
  const [data1, setData1] = React.useState(data.data.payments);
  const [produtoId, setProdutoId] = useState("");
  const [fornecedor, setFornecedor] = useState([]);
  const [fornecedorId, setFornecedorId] = useState("");
  const [banco, setBanco] = useState([]);
  const [bancoId, setBancoId] = useState("");
  const [pagamento, setPagamento] = useState([]);
  const [pagamentoId, setPagamentoId] = useState([]);
  const [pCusto, setPCusto] = useState("");
  const [pCustoNumerico, setPCustoNumerico] = useState("");
  const [vPago, setVPago] = useState("");
  const [vPagoNumerico, setVPagoNumerico] = useState("");
  const [total, setTotal] = useState("");
  const [totalNumerico, setTotalNumerico] = useState("");
  const [op, setOp] = useState(0);
  const [numero, setNumero] = useState(2);
  const [numero2, setNumero2] = useState(2);
  const [debitos, setDebitos] = useState("");
  const [data2, setData2] = useState(data.data2.debts);
  const [visivel, setVisivel] = React.useState("tabela");
  console.log(data2);

  const fetchData1 = async () => {
    const response = await fetch(
      "https://erp.sitesdahora.com.br/api/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await response.json();
    setProduto(data.products);
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
    setFornecedor(data.providers);
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

  const fetchData4 = async () => {
    const response = await fetch("https://erp.sitesdahora.com.br/api/banks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = await response.json();
    setBanco(data.banks);
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
  }, []);

  const result = produto.map((item: any) => ({
    label: `${item.name_product}`,
    id: item.id,
  }));

  const result2 = fornecedor.map((item: any) => ({
    label: `${item.nome_client}`,
    id: item.id,
  }));

  const result3 = pagamento.map((item: any) => ({
    label: `${item.name_payments}`,
    id: item.id,
  }));

  const result4 = banco.map((item: any) => ({
    label: `${item.name_bank}`,
    id: item.id,
  }));

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

  const handleChange = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rawValue / 100); // Divida por 100 para lidar com valores decimais

    setTotal(formattedValue);

    setTotalNumerico(formattedValue.replace(/\./g, "").replace(",", ".")); // Converte para número
  };

  const handleChange2 = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rawValue / 100); // Divida por 100 para lidar com valores decimais

    setPCusto(formattedValue);

    setPCustoNumerico(formattedValue.replace(/\./g, "").replace(",", ".")); // Converte para número
  };

  const handleChange3 = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rawValue / 100); // Divida por 100 para lidar com valores decimais

    setVPago(formattedValue);

    setVPagoNumerico(formattedValue.replace(/\./g, "").replace(",", ".")); // Converte para número
  };

  const buscaFiltrada1 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data1.filter((data1: any) =>
      data1.name_payments.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data1]);

  async function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    const result = async () => {
      const response = await fetch(
        `https://erp.sitesdahora.com.br/api/debt-create`,
        {
          method: "POST",
          body: JSON.stringify({
            name_debit: data.name_debit,
            number_note: data.number_note,
            number_check: data.number_check,
            banck_transmitter_cheque: data.banck_transmitter_cheque,
            value_total_debit: totalNumerico,
            parcel: data.parcel,
            date_payment: data.date_payment,
            value_paid: vPagoNumerico,
            escription: data.description,
            forms_payments_id: pagamentoId,
            banck_id: bancoId,
            provider_id: fornecedorId,
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
      } else {
        toast.error("Não foi possovel salvar estoque", {
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

  if (visivel === "tabela") {
    return (
      <>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Button
            onClick={() => {
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
            Contas a Pagar
          </Typography>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="A Pagar" value="1" sx={{ fontWeight: "600" }} />
                  {/* <Tab
                    label="fornecedor"
                    value="2"
                    sx={{ fontWeight: "600" }}
                  /> */}
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
                          <TableCell></TableCell>
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
                  Novo Registro
                </Typography>
              </Box>

              <Grid
                container
                spacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
              >
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Nome do Debito"
                      variant="filled"
                      id="name_debit"
                      name="name_debit"
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
                      label="Nº da nota"
                      variant="filled"
                      id="number_note"
                      name="number_note"
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
                      label="Número do cheque"
                      variant="filled"
                      id="number_check"
                      name="number_check"
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
                      label="Banco do cheque"
                      variant="filled"
                      id="banck_transmitter_cheque"
                      name="banck_transmitter_cheque"
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
                      label="Preço total"
                      variant="filled"
                      type="text"
                      id="value_total_debit"
                      name="value_total_debit"
                      value={total}
                      onChange={handleChange}
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
                    {numero == 1 ? (
                      <Box>
                        Para parcela em Dias utilizar o "/" Ex: 30/60. parcela
                        para 30 e 60 dias. Para meses basta colocar a quantidade
                        de meses que ira parcelar.
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

                <Grid item xs={12} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    {numero2 === 1 ? (
                      <FormLabel>Data do Pagamento</FormLabel>
                    ) : (
                      ""
                    )}
                    <TextField
                      variant="filled"
                      id="date_payment"
                      name="date_payment"
                      type="date"
                      onFocus={() => {
                        setNumero2(1);
                      }}
                      onBlur={() => {
                        setNumero2(2);
                      }}
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
                      label="Preço de custo"
                      variant="filled"
                      type="text"
                      id="price_cost"
                      name="price_cost"
                      value={pCusto}
                      onChange={handleChange2}
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
                      label="Valor Pago"
                      variant="filled"
                      type="text"
                      id="value_paid"
                      name="value_paid"
                      value={vPago}
                      onChange={handleChange3}
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
                      label="Descrição"
                      variant="filled"
                      id="description"
                      name="description"
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

                <Grid item xs={12} md={3} lg={3} xl={3}>
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      options={result4}
                      onChange={(event: any, newValue: any | null) => {
                        setBancoId(newValue.id);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Banco" required />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      options={result2}
                      onChange={(event: any, newValue: any | null) => {
                        setFornecedorId(newValue.id);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Fornecedor" required />
                      )}
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
