import React from "react";
import AskAbout from "../components/AskAbout";
import SidebarShort from "../components/SidebarShort";

const AskAboutPage = () => {
  return (
    <div className="bg-white-100 h-screen flex flex-row w-full bg-custom-beige-light">
      <SidebarShort />
      <div className="m-5">
        <AskAbout />
      </div>
    </div>
  );
};

export default AskAboutPage;
