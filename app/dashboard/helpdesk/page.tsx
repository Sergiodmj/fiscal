import * as React from "react";
import Grid from "@mui/material/Grid";
import Congratulations from "app/components/Dashboard/HelpDesk/Congratulations";
import TicketsResolved from "app/components/Dashboard/HelpDesk/TicketsResolved";
import TicketsInProgress from "app/components/Dashboard/HelpDesk/TicketsInProgress";
import TicketsDue from "app/components/Dashboard/HelpDesk/TicketsDue";
import TicketsNewOpen from "app/components/Dashboard/HelpDesk/TicketsNewOpen";
import TicketsStatus from "app/components/Dashboard/HelpDesk/TicketsStatus";
import CustomerSatisfaction from "app/components/Dashboard/HelpDesk/CustomerSatisfaction";
import ResponseTime from "app/components/Dashboard/HelpDesk/ResponseTime";
import PerformanceOfAgents from "app/components/Dashboard/HelpDesk/PerformanceOfAgents";
import NewTicketsSolvedTickets from "app/components/Dashboard/HelpDesk/NewTicketsSolvedTickets";
import RecentCustomerRatings from "app/components/Dashboard/HelpDesk/RecentCustomerRatings";
import ToDoList from "app/components/Dashboard/HelpDesk/ToDoList";
import SupportOverview from "app/components/Dashboard/HelpDesk/SupportOverview";

export default function Page() {
  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <Congratulations />

          <Grid container columnSpacing={{ xs: 1, sm: 3, md: 3, lg: 3 }}>
            <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
              <TicketsResolved />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
              <TicketsInProgress />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
              <TicketsDue />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
              <TicketsNewOpen />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <TicketsStatus />

          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
            <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
              <CustomerSatisfaction />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={12} xl={6}>
              <ResponseTime />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <PerformanceOfAgents />

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={7}>
          <NewTicketsSolvedTickets />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={5}>
          <RecentCustomerRatings />
        </Grid>
      </Grid>

      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
          <ToDoList />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
          <SupportOverview />
        </Grid>
      </Grid>
    </>
  );
}
