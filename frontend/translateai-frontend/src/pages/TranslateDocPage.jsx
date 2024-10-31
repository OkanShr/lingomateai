import React from "react";
import SidebarShort from "../components/SidebarShort";
import TranslateDoc from "../components/TranslateDoc";

function TranslateDocPage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row w-full bg-custom-beige-light">
      <SidebarShort />
      <div className="my-2 mx-5">
        <TranslateDoc />
      </div>
    </div>
  );
}

export default TranslateDocPage;
