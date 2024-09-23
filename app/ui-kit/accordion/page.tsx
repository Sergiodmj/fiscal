import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import BasicAccordion from "app/components/UiKit/Accordion/BasicAccordion";
import AccordionExpandIcon from "app/components/UiKit/Accordion/AccordionExpandIcon";
import AccordionTransition from "app/components/UiKit/Accordion/AccordionTransition";
import CustomizedAccordions from "app/components/UiKit/Accordion/CustomizedAccordions";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Accordion</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Accordion</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <BasicAccordion />

          <AccordionTransition />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <AccordionExpandIcon />

          <CustomizedAccordions />
        </Grid>
      </Grid>
    </>
  );
}
