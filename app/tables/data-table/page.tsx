import * as React from "react";
import NextLink from "next/link";
import TopSellingProducts from "app/components/Tables/TopSellingProducts";
import RecentOrders from "app/components/Tables/RecentOrders";
import RecentLeads from "app/components/Tables/RecentLeads";
import AllProjects from "app/components/Tables/AllProjects";
import MyTasks from "app/components/Tables/MyTasks";
import RecentCustomerRatings from "app/components/Tables/RecentCustomerRatings";
import ToDoList from "app/components/Tables/ToDoList";
import PerformanceOfAgents from "app/components/Tables/PerformanceOfAgents";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Data Table</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>Tables</li>
          <li>Data Table</li>
        </ul>
      </div>

      <AllProjects />

      <TopSellingProducts />

      <RecentOrders />

      <RecentLeads />

      <MyTasks />

      <PerformanceOfAgents />

      <RecentCustomerRatings />

      <ToDoList />
    </>
  );
}
