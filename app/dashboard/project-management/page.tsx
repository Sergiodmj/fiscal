import * as React from "react";
import Grid from "@mui/material/Grid";
import ProjectsOverview from "app/components/Dashboard/ProjectManagement/ProjectsOverview";
import ProjectsRoadmap from "app/components/Dashboard/ProjectManagement/ProjectsRoadmap";
import ProjectsProgress from "app/components/Dashboard/ProjectManagement/ProjectsProgress";
import MyTasks from "app/components/Dashboard/ProjectManagement/MyTasks";
import AllProjects from "app/components/Dashboard/ProjectManagement/AllProjects";
import ProjectsAnalysis from "app/components/Dashboard/ProjectManagement/ProjectsAnalysis";
import TeamMembers from "app/components/Dashboard/ProjectManagement/TeamMembers";
import WorkingSchedule from "app/components/Dashboard/ProjectManagement/WorkingSchedule";
import ToDoList from "app/components/Dashboard/ProjectManagement/ToDoList";
import TasksOverview from "app/components/Dashboard/ProjectManagement/TasksOverview";

export default function Page() {
  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <ProjectsOverview />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
          <ProjectsRoadmap />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
          <ProjectsProgress />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
          <MyTasks />
        </Grid>
      </Grid>

      <AllProjects />

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          <ProjectsAnalysis />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          <TeamMembers />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          <WorkingSchedule />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
          <ToDoList />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          <TasksOverview />
        </Grid>
      </Grid>
    </>
  );
}
