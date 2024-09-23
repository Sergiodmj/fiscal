import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import BasicButton from "app/components/UiKit/Buttons/BasicButton";
import TextButton from "app/components/UiKit/Buttons/TextButton";
import ContainedButton from "app/components/UiKit/Buttons/ContainedButton";
import ColorButton from "app/components/UiKit/Buttons/ColorButton";
import ButtonSizes from "app/components/UiKit/Buttons/ButtonSizes";
import ButtonsWithIconsAndLabel from "app/components/UiKit/Buttons/ButtonsWithIconsAndLabel";
import IconButtons from "app/components/UiKit/Buttons/IconButtons";
import IconButtonColors from "app/components/UiKit/Buttons/IconButtonColors";
import CustomizedButtons from "app/components/UiKit/Buttons/CustomizedButtons";
import ComplexButtons from "app/components/UiKit/Buttons/ComplexButtons";
import LoadingButtons from "app/components/UiKit/Buttons/LoadingButtons";
import FloatingActionButtons from "app/components/UiKit/FloatingActionButton/FloatingActionButtons";
import FloatingActionButtonSize from "app/components/UiKit/FloatingActionButton/FloatingActionButtonSize";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Buttons</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Buttons</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <BasicButton />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextButton />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <ContainedButton />

          <FloatingActionButtons />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <ColorButton />

          <FloatingActionButtonSize />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <ButtonSizes />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <ButtonsWithIconsAndLabel />

          <IconButtons />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <IconButtonColors />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <CustomizedButtons />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <ComplexButtons />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <LoadingButtons />
        </Grid>
      </Grid>
    </>
  );
}
