import React from "react";
import SidebarShort from "../components/SidebarShort";
import PdfTextExtractor from "../components/PdfTextExtractor";

function TranslateDocPage() {
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort />
      <div className="m-5">
        <PdfTextExtractor />
      </div>
    </div>
  );
}

export default TranslateDocPage;
