import * as React from "react";
import Grid from "@mui/material/Grid";
import Welcome from "app/components/Dashboard/eCommerce/Welcome";
import TotalSales from "app/components/Dashboard/eCommerce/TotalSales";
import TotalOrders from "app/components/Dashboard/eCommerce/TotalOrders";
import TotalCustomers from "app/components/Dashboard/eCommerce/TotalCustomers";
import TotalRevenue from "app/components/Dashboard/eCommerce/TotalRevenue";
import SalesByLocations from "app/components/Dashboard/eCommerce/SalesByLocations";
import TopSellingProducts from "app/components/Dashboard/eCommerce/TopSellingProducts";
import RecentOrders from "app/components/Dashboard/eCommerce/RecentOrders";
import OrderSummary from "app/components/Dashboard/eCommerce/OrderSummary";
import RecentTransactions from "app/components/Dashboard/eCommerce/RecentTransactions";
import ReturningCustomerRate from "app/components/Dashboard/eCommerce/ReturningCustomerRate";

export default function Home() {
  return (
    <>
      {/* <h1>Home</h1> */}
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={12} lg={12} xl={8}>
          <Welcome />

          <TotalSales />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={4}>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
          >
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <TotalOrders />
            </Grid>

            <Grid item xs={12} md={6} lg={6} xl={12}>
              <TotalCustomers />
            </Grid>

            <Grid item xs={12} md={6} lg={6} xl={12}>
              <TotalRevenue />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={5}>
          <SalesByLocations />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={7}>
          <TopSellingProducts />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={8}>
          <RecentOrders />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={4}>
          <OrderSummary />
        </Grid>

        <Grid item xs={12} md={5} lg={5} xl={4}>
          <RecentTransactions />
        </Grid>

        <Grid item xs={12} md={7} lg={7} xl={8}>
          <ReturningCustomerRate />
        </Grid>
      </Grid>
    </>
  );
}
