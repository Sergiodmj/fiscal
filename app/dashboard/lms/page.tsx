import * as React from "react";
import Grid from "@mui/material/Grid";
import Welcome from "app/components/Dashboard/LMS/Welcome";
import TotalCourses from "app/components/Dashboard/LMS/TotalCourses";
import TotalEnrolled from "app/components/Dashboard/LMS/TotalEnrolled";
import TotalMentors from "app/components/Dashboard/LMS/TotalMentors";
import StudentsInterestedTopics from "app/components/Dashboard/LMS/StudentsInterestedTopics";
import TopInstructors from "app/components/Dashboard/LMS/TopInstructors";
import StudentsProgress from "app/components/Dashboard/LMS/StudentsProgress";
import GroupLessons from "app/components/Dashboard/LMS/GroupLessons";
import EnrolledByCountries from "app/components/Dashboard/LMS/EnrolledByCountries";
import Courses from "app/components/Dashboard/LMS/Courses";
import CoursesSales from "app/components/Dashboard/LMS/CoursesSales";
import TimeSpent from "app/components/Dashboard/LMS/TimeSpent";
import OurTopCourses from "app/components/Dashboard/LMS/OurTopCourses";

export default function Page() {
  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <Welcome />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
          <TotalCourses />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
          <TotalEnrolled />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={2}>
          <TotalMentors />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={7}>
          <StudentsInterestedTopics />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={5}>
          <TopInstructors />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <StudentsProgress />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <GroupLessons />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <EnrolledByCountries />
        </Grid>
      </Grid>

      <Courses />

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          <CoursesSales />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
          <TimeSpent />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
          <OurTopCourses />
        </Grid>
      </Grid>
    </>
  );
}
