import * as React from "react";
import Grid from "@mui/material/Grid";
import RevenueGrowth from "app/components/Dashboard/Crm/RevenueGrowth";
import LeadConversion from "app/components/Dashboard/Crm/LeadConversion";
import TotalOrders from "app/components/Dashboard/Crm/TotalOrders";
import AnnualProfit from "app/components/Dashboard/Crm/AnnualProfit";
import BalanceOverview from "app/components/Dashboard/Crm/BalanceOverview";
import LeadsBySource from "app/components/Dashboard/Crm/LeadsBySource";
import TopPerformers from "app/components/Dashboard/Crm/TopPerformers";
import RecentLeads from "app/components/Dashboard/Crm/RecentLeads";
import SalesReport from "app/components/Dashboard/Crm/SalesReport";
import TopProductsBySales from "app/components/Dashboard/Crm/TopProductsBySales";

export default function Page() {
  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
          <RevenueGrowth />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
          <LeadConversion />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
          <TotalOrders />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
          <AnnualProfit />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
          <BalanceOverview />
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
          <LeadsBySource />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
          <TopPerformers />
        </Grid>

        <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
          <RecentLeads />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
          <SalesReport />
        </Grid>

        <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
          <TopProductsBySales />
        </Grid>
      </Grid>
    </>
  );
}
