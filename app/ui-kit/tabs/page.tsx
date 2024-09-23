import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import BasicTabs from "app/components/UiKit/Tabs/BasicTabs";
import LabTabs from "app/components/UiKit/Tabs/LabTabs";
import TabsWrappedLabel from "app/components/UiKit/Tabs/TabsWrappedLabel";
import ColorTabs from "app/components/UiKit/Tabs/ColorTabs";
import ScrollableTabsButtonAuto from "app/components/UiKit/Tabs/ScrollableTabsButtonAuto";
import VerticalTabs from "app/components/UiKit/Tabs/VerticalTabs";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Tabs</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Tabs</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <BasicTabs />

          <TabsWrappedLabel />

          <ScrollableTabsButtonAuto />
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={12}>
          <LabTabs />

          <ColorTabs />

          <VerticalTabs />
        </Grid>
      </Grid>
    </>
  );
}
