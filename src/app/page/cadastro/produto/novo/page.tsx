"use client";
import {
  Grid,
  Card,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";

export default function TextualInputs(product: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const [gEstoque, setGEestoque] = useState("1");
  const [ncms, setNcms] = useState([]);
  const [ncmsId, setNcmsID] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryID] = useState([]);
  const [unimed, setUnimed] = useState([]);
  const [unimedId, setUnimedID] = useState([]);
  const [pVenda, setPVenda] = useState("");
  const [pVendaNumerico, setPVendaNumerico] = useState("");
  const [pCusto, setPCusto] = useState("");
  const [pCustoNumerico, setPCustoNumerico] = useState("");

  if (!session) {
    redirect("/");
  }
  if (session?.user.permission != "ADMINISTRADOR") {
    redirect("/page/unauthorized");
  }

  const jwt = session?.user.token;

  function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    if (!product.searchParams.id) {
      const result = async () => {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/product-create",
          {
            method: "POST",
            body: JSON.stringify({
              name_product: data.name_product,
              manage_stock: gEstoque,
              barcode: data.barcode,
              ncm_id: ncmsId,
              category_id: categoryId,
              unit_id: unimedId,
              stock_min: data.stock_min,
              price_sale: pVendaNumerico.toString,
              price_cost: pCustoNumerico.toString,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const mensage = await response.json();
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
          router.push("/page/cadastro/produto");
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
    } else {
      const result2 = async () => {
        const response = await fetch(
          `https://erp.sitesdahora.com.br/api/product-edit/${product.searchParams.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              name_product: data.name_product,
              manage_stock: gEstoque,
              barcode: data.barcode,
              ncm_id: ncmsId,
              category_id: categoryId,
              unit_id: unimedId,
              stock_min: data.stock_min,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const mensage = await response.json();
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
          router.push(`/page/cadastro/produto`);
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
      result2();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/ncms",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const result = await response.json();
        setNcms(result.ncms);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
      // setSelectedResult(result);
    };
    const fetchData2 = async () => {
      try {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/categories",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const result = await response.json();
        setCategory(result.categorys);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    const fetchData3 = async () => {
      try {
        const response = await fetch(
          "https://erp.sitesdahora.com.br/api/units",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        ); // URL relativa ou absoluta
        const result = await response.json();
        setUnimed(result.units);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
    fetchData2();
    fetchData3();
  }, []);

  //Formata os campos de preço de venda e compra
  const handleChange = (e: any) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rawValue / 100); // Divida por 100 para lidar com valores decimais

    setPVenda(formattedValue);

    // Convertendo para formato numérico: substituindo vírgulas por pontos
    setPVendaNumerico(formattedValue.replace(/\./g, "").replace(",", ".")); // Converte para número
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

  //Altocomplete
  const result = ncms.map((item: any) => ({
    label: `${item.cod_ncm} / ${item.name_ncm}`,
    id: item.id,
  }));

  const result2 = category.map((item: any) => ({
    label: item.name_category,
    id: item.id,
  }));

  const result3 = unimed.map((item: any) => ({
    label: item.name_unit,
    id: item.id,
  }));

  //troca o ENTER pelo tab
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Impede o comportamento padrão do Enter

      // Encontra o próximo elemento de input ou botão no formulário
      const form = event.target.form;
      const index = Array.from(form).indexOf(event.target);
      const nextElement = form.elements[index + 1];

      if (nextElement) {
        nextElement.focus(); // Muda o foco para o próximo elemento
      }
    }
  };

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
                Novo Produto
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
                    Gerenciar estoque para esse produto ?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="manage_stock"
                    defaultValue={product.searchParams.manage_stock || 1}
                  >
                    <FormControlLabel
                      value="1"
                      // onChange={() => {setGEestoque("1")}}
                      onClick={() => {
                        setGEestoque("1");
                      }}
                      control={<Radio className="dark-radio" />}
                      label="Gerenciar"
                    />
                    <FormControlLabel
                      value="0"
                      onClick={() => {
                        setGEestoque("0");
                      }}
                      control={<Radio className="dark-radio" />}
                      label="Não Gerenciar"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Nome"
                    variant="filled"
                    id="name_product"
                    name="name_product"
                    defaultValue={product.searchParams.name_product}
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
                    label="Código de barras"
                    variant="filled"
                    id="barcode"
                    name="barcode"
                    onKeyDown={handleKeyDown}
                    defaultValue={product.searchParams.barcode}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    options={result}
                    onChange={(event: any, newValue: any | null) => {
                      setNcmsID(newValue.id);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="NCM" required />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    options={result2}
                    onChange={(event: any, newValue: any | null) => {
                      setCategoryID(newValue.id);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Categoria" required />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12} lg={12} xl={6}>
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    options={result3}
                    onChange={(event: any, newValue: any | null) => {
                      setUnimedID(newValue.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Unidade de medida"
                        required
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              {gEstoque === "1" ? (
                <Grid item xs={12} md={12} lg={12} xl={6}>
                  <FormControl fullWidth>
                    <TextField
                      label="Estoque Mínimo"
                      variant="filled"
                      type="number"
                      id="stock_min"
                      name="stock_min"
                      defaultValue={product.searchParams.stock_min}
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

              {!product.searchParams.id ? (
                <>
                  <Grid item xs={12} md={12} lg={12} xl={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Preço de venda"
                        variant="filled"
                        type="text"
                        id="price_sale"
                        name="price_sale"
                        value={pVenda}
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

                  <Grid item xs={12} md={12} lg={12} xl={6}>
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
                <Link href={"/page/cadastro/produto"}>
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
