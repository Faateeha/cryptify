import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PoolIcon from "@mui/icons-material/Pool";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { motion } from "framer-motion";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";

//links
const navLinks = [
  {
    name: "Dashboard",
    icon: DashboardIcon,  // Pass the component reference
  },
  {
    name: "Mining",
    icon: PoolIcon,  // Pass the component reference
  },
  {
    name: "Security",
    icon: SecurityIcon,  // Pass the component reference
  },
  {
    name: "Analytics",
    icon: AnalyticsIcon,  // Pass the component reference
  },
  {
    name: "Settings",
    icon: SettingsIcon,  // Pass the component reference
  },
];

const variants = {
  expanded: {
    width: "20%",
  },
  collapsed: {
    width: "5%",
  },
};

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeLink, setActiveLink] = useState(0);

  return (
    <motion.header
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={variants}
      className={
        "py-12 flex flex-col border border-r-1 w-1/5 relative dark:text-darktheme-text dark:bg-darktheme-background" +
        (isExpanded ? " px-10" : " px-[16px] duration-500")
      }
    >
      <div
        className="w-6 h-6 bg-yellow-600 rounded-full absolute top-14 -right-3 dark:bg-yellow-800"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <SwitchRightIcon />
      </div>

      <div className="flex items-center ">
        <h1>C</h1>
        <span className={isExpanded ? "block" : "hidden"}> Cryptify</span>
      </div>

      <ul className="mt-10 flex-col space-y-4">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={
              "flex items-center mt-4 cursor-pointer space-x-2" +
              (activeLink === index
                ? " bg-yellow-600 text-white rounded-lg font-semibold dark:bg-yellow-800"
                : "") +
              (isExpanded ? " p-2" : "p-1 duration-500")
            }
            onClick={() => setActiveLink(index)}
          >
            <link.icon className="w-6 h-6" />  {/* Render as component */}
            <span className={isExpanded ? "block" : "hidden"}>{link.name}</span>
          </li>
        ))}
      </ul>
    </motion.header>
  );
};

export default Sidebar;

