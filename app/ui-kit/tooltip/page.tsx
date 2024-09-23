import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import BasicTooltip from "app/components/UiKit/Tooltip/BasicTooltip";
import PositionedTooltips from "app/components/UiKit/Tooltip/PositionedTooltips";
import CustomizedTooltips from "app/components/UiKit/Tooltip/CustomizedTooltips";
import ArrowTooltips from "app/components/UiKit/Tooltip/ArrowTooltips";
import TriggersTooltips from "app/components/UiKit/Tooltip/TriggersTooltips";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Tooltip</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Tooltip</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <BasicTooltip />

          <ArrowTooltips />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <CustomizedTooltips />

          <TriggersTooltips />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={12}>
          <PositionedTooltips />
        </Grid>
      </Grid>
    </>
  );
}
