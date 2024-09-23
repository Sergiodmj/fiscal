import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import BasicSelect from "app/components/UiKit/Select/BasicSelect";
import SelectVariants from "app/components/UiKit/Select/SelectVariants";
import SelectAutoWidth from "app/components/UiKit/Select/SelectAutoWidth";
import SelectOtherProps from "app/components/UiKit/Select/SelectOtherProps";
import NativeSelectDemo from "app/components/UiKit/Select/NativeSelectDemo";
import MultipleSelect from "app/components/UiKit/Select/MultipleSelect";
import MultipleSelectCheckmarks from "app/components/UiKit/Select/MultipleSelectCheckmarks";
import MultipleSelectChip from "app/components/UiKit/Select/MultipleSelectChip";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Select</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Select</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <BasicSelect />

          <SelectAutoWidth />

          <NativeSelectDemo />

          <MultipleSelectCheckmarks />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <SelectVariants />

          <SelectOtherProps />

          <MultipleSelect />

          <MultipleSelectChip />
        </Grid>
      </Grid>
    </>
  );
}
