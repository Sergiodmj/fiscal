"use client";

import React from "react";
import {
  Card,
  Typography,
  Box,
  Tab,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Tooltip,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LabTabs(data: any) {
  const { data: session } = useSession();
  const jwt = session?.user.token;
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const inativar = { status_unit: "INATIVO" };
  const ativar = { status_unit: "ATIVO" };

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
          Categorias
        </Typography>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="ativas" value="1" sx={{ fontWeight: "600" }} />
                <Tab label="inativas" value="2" sx={{ fontWeight: "600" }} />
              </TabList>
            </Box>

            <TabPanel value="1">
              <TableContainer component={Paper}>
                <Table>
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
                    {data.data.units.map((unit: any) => {
                      return (
                        <TableRow key={unit.id}>
                          <TableCell>{unit.name_unit}</TableCell>
                          <TableCell>{unit.status_unit}</TableCell>
                          <TableCell>
                            <Link
                              href={{
                                pathname: "/page/cadastro/uniMedida/novo",
                                query: unit,
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
                                    `https://erp.sitesdahora.com.br/api/unit-edit-status/${unit.id}`,
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
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value="2">
              <TableContainer component={Paper}>
                <Table>
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
                    {data.data2.units.map((unit: any) => {
                      return (
                        <TableRow key={unit.id}>
                          <TableCell>{unit.name_unit}</TableCell>
                          <TableCell>{unit.status_unit}</TableCell>
                          <TableCell>
                            <Link
                              href={{
                                pathname: "/page/cadastro/uniMedida/novo",
                                query: unit,
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
                            <Tooltip title="HABILITAR">
                              <Button
                                onClick={() => {
                                  fetch(
                                    `https://erp.sitesdahora.com.br/api/unit-edit-status/${unit.id}`,
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
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
}
