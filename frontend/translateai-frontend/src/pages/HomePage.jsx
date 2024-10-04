import React from "react";
import SidebarShort from "../components/SidebarShort";

function HomePage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row bg-custom-beige-light">
      <SidebarShort />
      <div className="m-5">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}

export default HomePage;
