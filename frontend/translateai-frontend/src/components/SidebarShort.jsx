import React from "react";
import Sidebar from "../components/Sidebar";
import { SidebarItem } from "../components/Sidebar";
import { LayoutDashboard, Users } from "lucide-react";
export const SidebarShort = (props) => {
  const { documents, questions, ask_about, translate_doc, translate_txt } =
    props;
  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <Sidebar>
        {/* Can add link to home */}
        <h2>My Profile</h2>
        <SidebarItem
          text="Documents"
          icon={<LayoutDashboard size={20} />}
          onclick={"documents"}
          active={documents}
        />
        <SidebarItem
          text="Questions"
          icon={<Users size={20} />}
          onclick={"questions"}
          active={questions}
        />

        <h2>Services</h2>
        <SidebarItem
          text="Ask About"
          icon={<Users size={20} />}
          onclick={"ask_about"}
          active={ask_about}
        />
        <SidebarItem
          text="Translate Doc"
          icon={<Users size={20} />}
          onclick={"translate_doc"}
          active={translate_doc}
        />
        <SidebarItem
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
