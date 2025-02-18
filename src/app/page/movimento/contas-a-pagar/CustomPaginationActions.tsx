"use client";

import {
  Card,
  Typography,
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  FormLabel,
} from "@mui/material";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";

export default function CustomPaginationActions(data: any) {
  const { data: session } = useSession();
  const jwt = session?.user.token;
  const [produto, setProduto] = useState([]);
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

  async function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    const teste = JSON.stringify({
      product_id: produtoId,
      type_moviment: "ENTRADA",
      qtd_stock: data.qtd_stock,
      price_cost: pCusto,
      note_number: data.note_number,
      motive: data.motive,
      provider_id: fornecedorId,
      operation_id: data.operation_id,
      forms_payments_id: pagamentoId,
      number_check: data.number_check,
      banck_transmitter_cheque: data.banck_transmitter_cheque,
      parcel: data.parcel,
      banck_id: bancoId,
      name_debit: data.name_debit,
      value_total_debit: total,
    });
    console.log(teste);
    const result = async () => {
      const response = await fetch(
        `https://erp.sitesdahora.com.br/api/manage-stock`,
        {
          method: "POST",
          body: JSON.stringify({
            product_id: produtoId,
            type_moviment: "ENTRADA",
            qtd_stock: data.qtd_stock,
            price_cost: pCustoNumerico.toString,
            note_number: data.note_number,
            motive: data.motive,
            provider_id: fornecedorId,
            operation_id: data.operation_id,
            forms_payments_id: pagamentoId,
            number_check: data.number_check,
            banck_transmitter_cheque: data.banck_transmitter_cheque,
            parcel: data.parcel,
            banck_id: bancoId,
            name_debit: data.name_debit,
            value_total_debit: totalNumerico.toString,
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
                    required
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

              <Grid item xs={12} md={12} lg={12} xl={12}>
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

              <Grid item xs={12} md={12} lg={12} xl={12}>
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

              <Grid item xs={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Descrição"
                    variant="filled"
                    id="description"
                    name="description"
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

              <Grid item xs={12} md={12} lg={12} xl={12}>
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
                <Link href={"/page/movimento/estoque"}>
                  <Button
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
