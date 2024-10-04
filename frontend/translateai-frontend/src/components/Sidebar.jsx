import { LogOut, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authentication";
import doctorImg from "../assets/boy.svg";
import { useNavigate } from "react-router-dom";

// Create a context to share the expanded state
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(() => {
    const storedExpanded = localStorage.getItem("expanded");
    return storedExpanded !== null ? JSON.parse(storedExpanded) : null;
  });
  const loginDetails = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle logout
  const logoutFunction = (e) => {
    e.preventDefault();
    dispatch(logout());
    console.log("Logged out");
    navigate("/login");
  };

  // Handle screen size changes to set expanded state
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const storedExpanded = localStorage.getItem("expanded");
    const handleScreenChange = () => {
      const isExpanded = mediaQuery.matches;
      setExpanded(isExpanded);
      localStorage.setItem("expanded", JSON.stringify(isExpanded));
    };

    if (!storedExpanded) {
      handleScreenChange();
    }

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => mediaQuery.removeEventListener("change", handleScreenChange);
  }, []);

  // Toggle expanded state and store in local storage
  const toggleExpanded = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    localStorage.setItem("expanded", JSON.stringify(newExpanded));
  };

  return (
    // Provide the expanded state to children via context
    <SidebarContext.Provider value={{ expanded }}>
      <aside className="h-screen ">
        <nav className="h-full flex flex-col  border-r shadow-sm pt-4">
          <div
            className={`p-4 pb-2 flex${
              expanded ? " flex-row-reverse" : "flex-col"
            } justify-between`}
          >
            <button
              onClick={toggleExpanded}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
            {expanded ? <h1>LingoMate</h1> : <h1>LM</h1>}
          </div>
          <ul className="flex-1 px-3">{children}</ul>
          <LogOut className={"m-3"} onClick={logoutFunction} size={25} />
          <div className="border-t flex p-3">
            <img src={doctorImg} alt="" className="w-10 h-10 rounded-md" />
            <div
              className={`w-full flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-54 ml-3" : "w-0"
              }`}
            >
              <div className={`leading-4 ${expanded ? "" : "hidden"}`}>
                <h4 className="font-semibold">
                  {loginDetails.user ? loginDetails.user.username : ""}
                </h4>
                <span className="text-xs text-gray-600">
                  {loginDetails.user ? loginDetails.user.email : ""}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({
  staticImg,
  text,
  active,
  alert,
  onclick,
  isExternal,
  gifAlt,
  gifSrc,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isExternal) {
      window.location.href = `https://${onclick}.com`;
    } else {
      navigate(`/${onclick}`);
    }
  };

  return (
    <li
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-black-200 to-teal-100 text-white-900"
          : "hover:bg-teal-50 text-teal-600"
      }`}
    >
      <div className="relative">
        <img
          src={isHovered ? gifSrc : staticImg} // Switch between GIF and static image
          alt={gifAlt}
          className={`transition-all duration-300 ${
            isHovered ? "w-8 h-8" : "w-6 h-6"
          }`}
          style={{
            backgroundColor: isHovered ? "transparent" : "transparent",
          }}
        />
      </div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-teal-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <span
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-teal-100 text-teal-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </span>
      )}
    </li>
  );
}
