import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import TopSellingProducts from "app/components/Tables/TopSellingProducts";
import RecentOrders from "app/components/Tables/RecentOrders";
import TopPerformers from "app/components/Tables/TopPerformers";
import RecentLeads from "app/components/Tables/RecentLeads";
import AllProjects from "app/components/Tables/AllProjects";
import MyTasks from "app/components/Tables/MyTasks";
import StudentsProgress from "app/components/Tables/StudentsProgress";
import GroupLessons from "app/components/Tables/GroupLessons";
import RecentCustomerRatings from "app/components/Tables/RecentCustomerRatings";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Basic Table</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>Tables</li>
          <li>Basic Table</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={12} lg={12} xl={6}>
          <TopSellingProducts />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={6}>
          <RecentOrders />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={12} lg={12} xl={4}>
          <TopPerformers />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={8}>
          <RecentLeads />
        </Grid>
      </Grid>

      <AllProjects />

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={12} lg={12} xl={6}>
          <StudentsProgress />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={6}>
          <GroupLessons />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={12} lg={12} xl={6}>
          <MyTasks />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={6}>
          <RecentCustomerRatings />
        </Grid>
      </Grid>
    </>
  );
}
