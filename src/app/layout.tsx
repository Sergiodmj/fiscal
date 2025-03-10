import "swiper/css";
import "swiper/css/bundle";
import "remixicon/fonts/remixicon.css";
import "../../styles/front-pages.css";
import "../../styles/control-panel.css";
import "../../styles/left-sidebar-menu.css";
import "../../styles/top-navbar.css";
import "../../styles/globals.css";
// globals dark Mode CSS
import "../../styles/dark.css";
// globals RTL Mode CSS
import "../../styles/rtl.css";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import LayoutProvider from "@/providers/LayoutProvider";
import AuthProvider from "./components/providers/outh-provider";
import ToastProvider from "@/providers/ToastProvider";

export const metadata = {
  title: "Comercial",
  description: "Sistema Comercial",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="pr-br">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body>
        <AuthProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />

              <LayoutProvider>
                <ToastProvider>{props.children}</ToastProvider>
              </LayoutProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
