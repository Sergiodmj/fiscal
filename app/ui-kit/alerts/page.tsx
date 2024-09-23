import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import SimpleAlert from "app/components/UiKit/Alerts/SimpleAlert";
import BasicAlerts from "app/components/UiKit/Alerts/BasicAlerts";
import FilledAlerts from "app/components/UiKit/Alerts/FilledAlerts";
import OutlinedAlerts from "app/components/UiKit/Alerts/OutlinedAlerts";
import DescriptionAlerts from "app/components/UiKit/Alerts/DescriptionAlerts";
import TransitionAlerts from "app/components/UiKit/Alerts/TransitionAlerts";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Alerts</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Alerts</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <SimpleAlert />

          <FilledAlerts />

          <DescriptionAlerts />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <BasicAlerts />

          <OutlinedAlerts />

          <TransitionAlerts />
        </Grid>
      </Grid>
    </>
  );
}
