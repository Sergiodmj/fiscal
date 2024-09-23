"use client";

import * as React from "react";
import NextLink from "next/link";
import Grid from "@mui/material/Grid";
import Welcome from "app/components/MyProfile/Welcome";
import TotalProjects from "app/components/MyProfile/TotalProjects";
import TotalOrders from "app/components/MyProfile/TotalOrders";
import TotalRevenue from "app/components/MyProfile/TotalRevenue";
import ProfileIntro from "app/components/MyProfile/ProfileIntro";
import ProfileInformation from "app/components/MyProfile/ProfileInformation";
import AdditionalInformation from "app/components/MyProfile/AdditionalInformation";
import ProjectsAnalysis from "app/components/MyProfile/ProjectsAnalysis";
import ToDoList from "app/components/MyProfile/ToDoList";
import RecentActivity from "app/components/MyProfile/RecentActivity";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>My Profile</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>My Profile</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <Welcome />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
          <TotalProjects />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
          <TotalOrders />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
          <TotalRevenue />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={3}>
          <ProfileIntro />

          <ProfileInformation />

          <AdditionalInformation />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={9}>
          <ProjectsAnalysis />

          <ToDoList />

          <RecentActivity />
        </Grid>
      </Grid>
    </>
  );
}
