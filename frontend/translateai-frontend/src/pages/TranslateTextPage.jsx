import React from "react";
import SidebarShort from "../components/SidebarShort";
import TranslateText from "../components/TranslateText";

function TranslateTextPage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort />
      <div className="m-5">
        <TranslateText />
      </div>
    </div>
  );
}

export default TranslateTextPage;
