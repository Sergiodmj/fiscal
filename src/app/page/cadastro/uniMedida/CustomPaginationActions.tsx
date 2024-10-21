"use client";

import React, { useMemo } from "react";
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
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

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
  const data1 = data.data.units
  const data2 = data.data2.units;


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

  const inativar = { status_unit: "INATIVO" };
  const ativar = { status_unit: "ATIVO" };

  const buscaFiltrada1 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data1.filter((data1: any) =>
      data1.name_unit.toLowerCase().includes(lowerBusca)
    );
  }, [busca]);

  const buscaFiltrada2 = useMemo(() => {
    const lowerBusca = busca.toLowerCase();
    return data2.filter((data2: any) =>
      data2.name_unit.toLowerCase().includes(lowerBusca)
    );
  }, [busca]);

  return (
    <>
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
                        <TableCell>Status</TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? buscaFiltrada1.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : buscaFiltrada1
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
                            {row.name_unit}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.status_unit}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            <Link
                              href={{
                                pathname: "/page/cadastro/categoria/novo",
                                query: row,
                              }}
                            >
                              <Tooltip title="EDITAR">
                                <Button>
                                  <span className="material-symbols-outlined">
                                    edit
                                  </span>
                                </Button>
                              </Tooltip>
                            </Link>

                            <Tooltip title="INABILITAR">
                              <Button
                                onClick={() => {
                                  fetch(
                                    `https://erp.sitesdahora.com.br/api/unit-edit-status/${row.id}`,

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
                                  window.location.reload();
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
                        <TableCell>Status</TableCell>
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
                            {row.name_unit}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.status_unit}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            <Link
                              href={{
                                pathname: "/page/cadastro/categoria/novo",
                                query: row,
                              }}
                            >
                              <Tooltip title="EDITAR">
                                <Button>
                                  <span className="material-symbols-outlined">
                                    edit
                                  </span>
                                </Button>
                              </Tooltip>
                            </Link>

                            <Tooltip title="INABILITAR">
                              <Button
                                onClick={() => {
                                  fetch(
                                    `https://erp.sitesdahora.com.br/api/unit-edit-status/${row.id}`,

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
                                  window.location.reload();
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
}
