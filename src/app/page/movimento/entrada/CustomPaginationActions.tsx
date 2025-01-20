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
} from "@mui/material";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function CustomPaginationActions(data: any) {
  const { data: session } = useSession();
  const jwt = session?.user.token;
  const [produto, setProduto] = useState([]);
  const [produtoId, setProdutoId] = useState([]);
  const [fornecedor, setFornecedor] = useState([]);
  const [fornecedorId, setFornecedorId] = useState([]);
  const [pCusto, setPCusto] = useState("");
  const [pCustoNumerico, setPCustoNumerico] = useState("");

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

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const result = produto.map((item: any) => ({
    label: `${item.name_product}`,
    id: item.id,
  }));
  const result2 = fornecedor.map((item: any) => ({
    label: `${item.nome_client}`,
    id: item.id,
  }));

  const handleChange2 = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rawValue / 100); // Divida por 100 para lidar com valores decimais

    setPCusto(formattedValue);

    setPCustoNumerico(formattedValue.replace(/\./g, "").replace(",", ".")); // Converte para número
  };

  async function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    console.log(produtoId);
    console.log(fornecedorId);
    // const result = async () => {
    //   const response = await fetch(`***`, {
    //     method: "PUT",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${jwt}`,
    //     },
    //   });
    //   const mensage = await response.json();
    //   if (mensage.success === true) {
    //     toast.success(`Alterado com sucesso`, {
    //       position: "top-center",
    //       autoClose: 1000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //       transition: Flip,
    //     });
    //   } else {
    //     toast.error(`${mensage.message}`, {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //       transition: Flip,
    //     });
    //   }
    // };
    // result();
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
                Nova Entrada
              </Typography>
            </Box>

            <Grid
              container
              spacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}
            >
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    options={result}
                    onChange={(event: any, newValue: any | null) => {
                      setProdutoId(newValue.id);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Produto" required />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4} md={4} lg={4} xl={4}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel>Operção</InputLabel>
                    <Select
                      labelId="motivo"
                      id="motive"
                      name="motive"
                      label="Motivo"
                      sx={{
                        "& fieldset": {
                          border: "1px solid #D5D9E2",
                          borderRadius: "7px",
                        },
                      }}
                    >
                      <MenuItem value="1">Compra de mercadoria</MenuItem>
                      <MenuItem value="2">Devoluções de clientes</MenuItem>
                      <MenuItem value="3">Ajuste de Estoque</MenuItem>
                      <MenuItem value="4">
                        Bonificações / brindes recebidos
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={4} md={4} lg={4} xl={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Quantidade"
                    variant="filled"
                    id="qtd_stock"
                    name="qtd_stock"
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

              <Grid item xs={4} md={4} lg={4} xl={4}>
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

              <Grid item xs={4} md={4} lg={4} xl={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Nº da nota"
                    variant="filled"
                    id="note_number"
                    name="note_number"
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

              <Grid item xs={8} md={8} lg={8} xl={8}>
                <FormControl fullWidth>
                  <TextField
                    label="Motivo"
                    variant="filled"
                    id="motive"
                    name="motive"
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

              <Grid item xs={6} md={6} lg={6} xl={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    options={result2}
                    onChange={(event: any, newValue: any | null) => {
                      setFornecedorId(newValue.id);
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

              <Grid item xs={6} md={6} lg={6} xl={6}>
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

              <Grid item xs={4} md={4} lg={4} xl={4}>
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

              <Grid item xs={4} md={4} lg={4} xl={4}>
                <FormControl fullWidth>
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
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
