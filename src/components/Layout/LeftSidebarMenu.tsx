// File path: /styles/left-sidebar-menu.scss

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box, Button, Typography } from "@mui/material";
import LogoutButton from "../Authentication/logOutButton";
import { useSession } from "next-auth/react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3a4252" : "#f6f7f9",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    // marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface LeftSidebarProps {
  toggleActive: () => void;
}

const LeftSidebarMenu: React.FC<LeftSidebarProps> = ({ toggleActive }) => {
  const pathname = usePathname();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const { data: session } = useSession();

  return (
    <>
      <div className="leftSidebarDark">
        <div className="left-sidebar-menu">
          <div className="logo">
            <Link href="/page/home">
              <Image
                src="/images/logo-icon.svg"
                alt="logo-icon"
                width={26}
                height={26}
              />
              <span>Comercial</span>
            </Link>
          </div>

          <Box className="burger-menu" onClick={toggleActive}>
            <span className="top-bar"></span>
            <span className="middle-bar"></span>
            <span className="bottom-bar"></span>
          </Box>

          <div className="sidebar-inner">
            <div className="sidebar-menu">
              <Typography
                className="sub-title"
                sx={{
                  display: "block",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Menu
              </Typography>

              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                className="mat-accordion"
              >
                <AccordionSummary
                  className="mat-summary"
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <i className="material-symbols-outlined">dashboard</i>
                  <span className="title">Cadastro</span>
                </AccordionSummary>

                <AccordionDetails className="mat-details">
                  <ul className="sidebar-sub-menu">
                    {session?.user.permission === "SUPER_ADMIN" ? (
                      <li className="sidemenu-item">
                        <Link
                          href="/page/cadastro/empresa"
                          className={`sidemenu-link ${
                            pathname === "/page/cadastro/empresa"
                              ? "active"
                              : ""
                          }`}
                        >
                          Empresa
                          <span className="trezo-badge">mstr</span>
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li className="sidemenu-item">
                          <Link
                            href="/page/cadastro/produto"
                            className={`sidemenu-link ${
                              pathname === "/page/cadastro/produto"
                                ? "active"
                                : ""
                            }`}
                          >
                            Produto
                          </Link>
                        </li>

                        <li className="sidemenu-item">
                          <Link
                            href="/page/cadastro/cliente-fornecedor"
                            className={`sidemenu-link ${
                              pathname === "/page/cadastro/cliente-fornecedor"
                                ? "active"
                                : ""
                            }`}
                          >
                            Cliente/Fornecedor
                          </Link>
                        </li>

                        {session?.user.permission != "FUNCIONARIO" ? (
                          <>
                            <li className="sidemenu-item">
                              <Link
                                href="/page/cadastro/categoria"
                                className={`sidemenu-link ${
                                  pathname === "/page/cadastro/categoria"
                                    ? "active"
                                    : ""
                                }`}
                              >
                                Categoria
                                <span className="trezo-badge">adm</span>
                              </Link>
                            </li>

                            <li className="sidemenu-item">
                              <Link
                                href="/page/cadastro/uniMedida"
                                className={`sidemenu-link ${
                                  pathname === "/page/cadastro/uniMedida"
                                    ? "active"
                                    : ""
                                }`}
                              >
                                Uni medida
                                <span className="trezo-badge">adm</span>
                              </Link>
                            </li>

                            <li className="sidemenu-item">
                              <Link
                                href="/page/cadastro/pagamento"
                                className={`sidemenu-link ${
                                  pathname === "/page/cadastro/pagamento"
                                    ? "active"
                                    : ""
                                }`}
                              >
                                Pagamento
                                <span className="trezo-badge">adm</span>
                              </Link>
                            </li>

                            <li className="sidemenu-item">
                              <Link
                                href="/page/cadastro/banco"
                                className={`sidemenu-link ${
                                  pathname === "/page/cadastro/banco"
                                    ? "active"
                                    : ""
                                }`}
                              >
                                Banco
                                <span className="trezo-badge">adm</span>
                              </Link>
                            </li>

                            <li className="sidemenu-item">
                              <Link
                                href="/page/cadastro/ncm"
                                className={`sidemenu-link ${
                                  pathname === "/page/cadastro/ncm"
                                    ? "active"
                                    : ""
                                }`}
                              >
                                Ncm
                                <span className="trezo-badge">adm</span>
                              </Link>
                            </li>

                            <li className="sidemenu-item">
                              <Link
                                href="/page/cadastro/usuario"
                                className={`sidemenu-link ${
                                  pathname === "/page/cadastro/usuario"
                                    ? "active"
                                    : ""
                                }`}
                              >
                                Usuário
                                <span className="trezo-badge">adm</span>
                              </Link>
                            </li>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
                className="mat-accordion"
              >
                <AccordionSummary
                  className="mat-summary"
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <i className="material-symbols-outlined">swap_horiz</i>
                  <span className="title">Movimento</span>
                </AccordionSummary>

                <AccordionDetails className="mat-details">
                  <ul className="sidebar-sub-menu">
                    <li className="sidemenu-item">
                      <Link
                        href="/page/movimento/estoque"
                        className={`sidemenu-link ${
                          pathname === "/page/movimento/estoque" ? "active" : ""
                        }`}
                      >
                        Estoque
                      </Link>
                    </li>
                    <li className="sidemenu-item">
                      <Link
                        href="/page/movimento/entrada"
                        className={`sidemenu-link ${
                          pathname === "/page/movimento/entrada" ? "active" : ""
                        }`}
                      >
                        Entrada
                      </Link>
                    </li>
                    <li className="sidemenu-item">
                      <Link
                        href="/page/movimento/saida"
                        className={`sidemenu-link ${
                          pathname === "/page/movimento/saida" ? "active" : ""
                        }`}
                      >
                        Saída
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Typography
                className="sub-title"
                sx={{
                  display: "block",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                OTHERS
              </Typography>

              <Link href="/my-profile" className="sidebar-menu-link">
                <i className="material-symbols-outlined">account_circle</i>
                <span className="title">Meu Perfil</span>
              </Link>

              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarMenu;
