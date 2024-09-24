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

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

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
                  {/* <span className="trezo-badge">5</span> */}
                </AccordionSummary>

                <AccordionDetails className="mat-details">
                  <ul className="sidebar-sub-menu">
                    <li className="sidemenu-item">
                      <Link
                        href="/page/cadastro/empresa"
                        className={`sidemenu-link ${
                          pathname === "/page/cadastro/empresa" ? "active" : ""
                        }`}
                      >
                        Empresa
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/page/cadastro/produto"
                        className={`sidemenu-link ${
                          pathname === "/page/cadastro/produto" ? "active" : ""
                        }`}
                      >
                        Produto
                        {/* <span className="trezo-badge">Hot</span> */}
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/page/cadastro/usuario"
                        className={`sidemenu-link ${
                          pathname === "/page/cadastro/usuario" ? "active" : ""
                        }`}
                      >
                        Usuário
                      </Link>
                    </li>
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === "panel20"}
                onChange={handleChange("panel20")}
                className="mat-accordion"
              >
                <AccordionSummary
                  className="mat-summary"
                  aria-controls="panel20d-content"
                  id="panel20d-header"
                >
                  <i className="material-symbols-outlined">lock_open</i>
                  <span className="title">Authentication</span>
                </AccordionSummary>

                <AccordionDetails className="mat-details">
                  <ul className="sidebar-sub-menu">
                    <li className="sidemenu-item">
                      <Link
                        href="/authentication/sign-in/"
                        className={`sidemenu-link ${
                          pathname === "/authentication/sign-in/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Sign In
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/authentication/sign-up/"
                        className={`sidemenu-link ${
                          pathname === "/authentication/sign-up/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Sign Up
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/authentication/forgot-password/"
                        className={`sidemenu-link ${
                          pathname === "/authentication/forgot-password/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Forgot Password
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/authentication/reset-password/"
                        className={`sidemenu-link ${
                          pathname === "/authentication/reset-password/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Reset Password
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/authentication/confirm-email/"
                        className={`sidemenu-link ${
                          pathname === "/authentication/confirm-email/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Confirm Email
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/authentication/lock-screen/"
                        className={`sidemenu-link ${
                          pathname === "/authentication/lock-screen/"
                            ? "active"
                            : ""
                        }`}
                      >
                        Lock Screen
                      </Link>
                    </li>

                    <li className="sidemenu-item">
                      <Link
                        href="/authentication/logout/"
                        className="sidemenu-link"
                      >
                        Logout
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
              {/* <Button
                className="sidebar-menu-link"
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="title">Logout</span>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarMenu;
