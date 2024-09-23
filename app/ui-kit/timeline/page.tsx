import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import BasicTimeline from "app/components/UiKit/Timeline/BasicTimeline";
import LeftPositionedTimeline from "app/components/UiKit/Timeline/LeftPositionedTimeline";
import AlternateTimeline from "app/components/UiKit/Timeline/AlternateTimeline";
import AlternateReverseTimeline from "app/components/UiKit/Timeline/AlternateReverseTimeline";
import ColorsTimeline from "app/components/UiKit/Timeline/ColorsTimeline";
import OutlinedTimeline from "app/components/UiKit/Timeline/OutlinedTimeline";
import OppositeContentTimeline from "app/components/UiKit/Timeline/OppositeContentTimeline";
import CustomizedTimeline from "app/components/UiKit/Timeline/CustomizedTimeline";
import LeftAlignedTimeline from "app/components/UiKit/Timeline/LeftAlignedTimeline";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Timeline</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Timeline</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <BasicTimeline />

          <AlternateTimeline />

          <ColorsTimeline />

          <OppositeContentTimeline />

          <CustomizedTimeline />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <LeftPositionedTimeline />

          <AlternateReverseTimeline />

          <OutlinedTimeline />

          <LeftAlignedTimeline />
        </Grid>
      </Grid>
    </>
  );
}
