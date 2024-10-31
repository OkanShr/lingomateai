import React from "react";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, Users } from "lucide-react";
import questionGif from "../assets/question.gif";
import questionStatic from "../assets/question.png";
import folderGif from "../assets/folder.gif";
import folderStatic from "../assets/folder.png";
import questionsGif from "../assets/manual.gif";
import questionsStatic from "../assets/manual.png";
import translateTextGif from "../assets/translate.gif";
import translateTextStatic from "../assets/translate.png";
import translateDocGif from "../assets/dialogue.gif";
import translateDocStatic from "../assets/dialogue.png";

export const SidebarShort = (props) => {
  const {
    expanded,
    documents,
    questions,
    ask_about,
    translate_doc,
    translate_txt,
  } = props;

  return (
    <div className="bg-white h-screen max-w-72 flex flex-row ">
      <Sidebar expanded={expanded}>
        {/* Conditionally render heading or divider based on the expanded state */}

        {expanded ? (
          <h2>Services</h2>
        ) : (
          <div className="border-t border-gray-300 my-2" />
        )}
        <SidebarItem
          staticImg={questionStatic}
          text="Ask About"
          gifSrc={questionGif}
          onclick={"ask_about"}
          active={ask_about}
          gifAlt={"ask_about"}
        />
        <SidebarItem
          staticImg={translateDocStatic}
          gifSrc={translateDocGif}
          text="Translate Doc"
          icon={<Users size={20} />}
          onclick={"translate_doc"}
          active={translate_doc}
          gifAlt={"translate_doc"}
        />
        <SidebarItem
          staticImg={translateTextStatic}
          gifSrc={translateTextGif}
          gifAlt={"translate_txt"}
          text="Translate Text"
          icon={<Users size={20} />}
          onclick={"translate_txt"}
          active={translate_txt}
        />
      </Sidebar>
    </div>
  );
};

export default SidebarShort;
