import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import StandardImageList from "app/components/UiKit/ImageList/StandardImageList";
import WovenImageList from "app/components/UiKit/ImageList/WovenImageList";
import MasonryImageList from "app/components/UiKit/ImageList/MasonryImageList";
import TitlebarImageList from "app/components/UiKit/ImageList/TitlebarImageList";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Image List</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Image List</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <StandardImageList />

          <MasonryImageList />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <WovenImageList />

          <TitlebarImageList />
        </Grid>
      </Grid>
    </>
  );
}
