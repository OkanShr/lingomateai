import React from "react";
import SidebarShort from "../components/SidebarShort";

function HomePage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort />
      <h1>Dashboard</h1>
    </div>
  );
}

export default HomePage;
