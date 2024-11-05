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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
  const [produto, setProduto] = React.useState<any>("");
  const [data1, setData1] = React.useState(data.data.products);
  const [data2, setData2] = React.useState(data.data2.products);
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
    setData1(data.products);
  };

  const fetchData2 = async () => {
    const response = await fetch(
      "https://erp.sitesdahora.com.br/api/products-inactive",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const data = await response.json();
    setData2(data.products);
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
    const fetchBusca = async () => {
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
    const fetchBusca2 = async () => {
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
    const fetchBusca3 = async () => {
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

    fetchBusca();
    fetchBusca2();
    fetchBusca3();
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

  const inativar = { status_product: "INATIVO" };
  const ativar = { status_product: "ATIVO" };

  const buscaFiltrada1 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data1.filter((data1: any) =>
      data1.name_product.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data1]);

  const buscaFiltrada2 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data2.filter((data2: any) =>
      data2.name_product.toLowerCase().includes(lowerBusca)
    );
  }, [busca, data2]);

  function Salvar(form: FormData) {
    const data = Object.fromEntries(form);
    if (produto === "") {
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
        console.log(mensage);
        if (mensage.success === true) {
          fetchData1();
          fetchData2();
          setPCusto("");
          setPVenda("");
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

  //Formata os campos de preço de venda e compra
  const handleChange3 = (e: any) => {
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

  if (visivel === "tabela") {
    return (
      <>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Button
            onClick={() => {
              setProduto("");
              setVisivel("formulario");
              setPCusto("");
              setPVenda("");
            }}
            variant="outlined"
            color="success"
            sx={{
              padding: "10px 24px",
            }}
          >
            Novo produto
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
            Produto
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
                          <TableCell>Categoria</TableCell>
                          <TableCell>Uni Medida</TableCell>
                          <TableCell>Preço de venda</TableCell>
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
                              {row.name_product}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {row.category.name_category}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {row.unit.name_unit}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(row.price_sale)}
                            </TableCell>
                            <TableCell
                              style={{ width: 160 }}
                              align="right"
                              colSpan={2}
                            >
                              <Tooltip title="EDITAR">
                                <Button
                                  onClick={() => {
                                    setProduto(row);
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
                                      `https://erp.sitesdahora.com.br/api/product-edit-status/${row.id}`,
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
                                    fetchData1();
                                    fetchData2();
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    remove
                                  </span>
                                </Button>
                              </Tooltip>

                              <FormDialog data={row} />
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
                          <TableCell>Categoria</TableCell>
                          <TableCell>Uni Medida</TableCell>
                          <TableCell>Preço de venda</TableCell>
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
                              {row.name_product}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {row.category.name_category}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {row.unit.name_unit}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(row.price_sale)}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                              <Tooltip title="EDITAR">
                                <Button
                                  onClick={() => {
                                    setProduto(row);
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
                                      `https://erp.sitesdahora.com.br/api/product-edit-status/${row.id}`,
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
                                      toast.success("Habilitado com Sucesso", {
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
                                    fetchData1();
                                    fetchData2();
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
                      defaultValue={produto.manage_stock || 1}
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
                      defaultValue={produto.name_product}
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
                      defaultValue={produto.barcode}
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
                        defaultValue={produto.stock_min}
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

                {produto === "" ? (
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
                  <Button
                    onClick={() => {
                      setVisivel("tabela");
                      setPCusto("");
                      setPVenda("");
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
