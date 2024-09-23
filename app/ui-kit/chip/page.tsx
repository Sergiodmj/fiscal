import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import BasicChips from "app/components/UiKit/Chip/BasicChips";
import ClickableChips from "app/components/UiKit/Chip/ClickableChips";
import DeletableChips from "app/components/UiKit/Chip/DeletableChips";
import ClickableAndDeletableChips from "app/components/UiKit/Chip/ClickableAndDeletableChips";
import ClickableLinkChips from "app/components/UiKit/Chip/ClickableLinkChips";
import AvatarChips from "app/components/UiKit/Chip/AvatarChips";
import IconChips from "app/components/UiKit/Chip/IconChips";
import ChipsArray from "app/components/UiKit/Chip/ChipsArray";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Chip</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Chip</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <BasicChips />

          <DeletableChips />

          <ClickableLinkChips />

          <IconChips />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <ClickableChips />

          <ClickableAndDeletableChips />

          <AvatarChips />

          <ChipsArray />
        </Grid>
      </Grid>
    </>
  );
}
