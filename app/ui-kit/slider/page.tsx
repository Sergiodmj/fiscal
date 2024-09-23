import * as React from "react";
import NextLink from "next/link";
import { Grid } from "@mui/material";
import ContinuousSlider from "app/components/UiKit/Slider/ContinuousSlider";
import SliderSizes from "app/components/UiKit/Slider/SliderSizes";
import DiscreteSlider from "app/components/UiKit/Slider/DiscreteSlider";
import DiscreteSliderSteps from "app/components/UiKit/Slider/DiscreteSliderSteps";
import DiscreteSliderMarks from "app/components/UiKit/Slider/DiscreteSliderMarks";
import DiscreteSliderValues from "app/components/UiKit/Slider/DiscreteSliderValues";
import DiscreteSliderLabel from "app/components/UiKit/Slider/DiscreteSliderLabel";
import RangeSlider from "app/components/UiKit/Slider/RangeSlider";
import MinimumDistanceSlider from "app/components/UiKit/Slider/MinimumDistanceSlider";
import CustomizedSlider from "app/components/UiKit/Slider/CustomizedSlider";
import VerticalSlider from "app/components/UiKit/Slider/VerticalSlider";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Slider</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>UI Elements</li>
          <li>Slider</li>
        </ul>
      </div>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <ContinuousSlider />

          <DiscreteSlider />

          <DiscreteSliderMarks />

          <DiscreteSliderLabel />

          <MinimumDistanceSlider />

          <VerticalSlider />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <SliderSizes />

          <DiscreteSliderSteps />

          <DiscreteSliderValues />

          <RangeSlider />

          <CustomizedSlider />
        </Grid>
      </Grid>
    </>
  );
}
