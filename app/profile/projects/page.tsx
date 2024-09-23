import * as React from "react";
import NextLink from "next/link";
import CoverImage from "app/components/Profile/CoverImage";
import NavList from "app/components/Profile/NavList";
import MyProjects from "app/components/Profile/MyProjects";

export default function Page() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Profile</h5>

        <ul className="breadcrumb">
          <li>
            <NextLink href="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </NextLink>
          </li>
          <li>Profile</li>
        </ul>
      </div>

      <CoverImage />

      <NavList />

      <MyProjects />
    </>
  );
}
