import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PoolIcon from "@mui/icons-material/Pool";
import SettingsIcon from "@mui/icons-material/Settings";
import SecurityIcon from "@mui/icons-material/Security";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { motion } from "framer-motion";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../assets/cryptify-logo.png";
import { Drawer, IconButton } from "@mui/material";

// Links for the sidebar
const navLinks = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
  },
  {
    name: "Mining",
    icon: PoolIcon,
  },
  {
    name: "Security",
    icon: SecurityIcon,
  },
  {
    name: "Analytics",
    icon: AnalyticsIcon,
  },
  {
    name: "Settings",
    icon: SettingsIcon,
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
  const [isExpanded, setIsExpanded] = useState(true); // For desktop
  const [activeLink, setActiveLink] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // For mobile

  const renderNavLinks = () => (
    <ul className="mt-10 flex-col space-y-4">
      {navLinks.map((link, index) => (
        <li
          key={index}
          className={
            "flex items-center mt-4 cursor-pointer space-x-1" +
            (activeLink === index
              ? " bg-yellow-600 text-white rounded-lg font-semibold dark:bg-yellow-800"
              : "") +
            (isExpanded ? " p-2" : "p-1 duration-500")
          }
          onClick={() => setActiveLink(index)}
        >
          <link.icon className="w-6 h-6" />
          <span className={isExpanded ? "block" : "hidden"}>{link.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <div className="lg:hidden fixed top-6 left-4 z-50">
        <IconButton onClick={() => setIsDrawerOpen(true)} color="inherit">
          <MenuIcon />
        </IconButton>
      </div>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="p-4 w-64 dark:text-darktheme-text dark:bg-darktheme-background h-full">
          {/* Close Button */}
          <IconButton
            onClick={() => setIsDrawerOpen(false)}
            className="mb-4 text-white"
          >
            <CloseIcon />
          </IconButton>
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="cryptify" className="w-[60px] pr-4" />
            <span className="text-yellow-500 font-semibold text-xl">Cryptify</span>
          </div>
          {renderNavLinks()}
        </div>
      </Drawer>

      {/* Sidebar for Desktop */}
      <motion.header
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={variants}
        className={
          "hidden lg:flex py-12 flex-col border-r-1 w-1/5 h-full relative " +
          (isExpanded ? " px-10" : " px-[16px] duration-500")
        }
      >
        {/* Toggle Button */}
        <div
          className="w-6 h-6 bg-yellow-600 rounded-full absolute top-14 -right-3 dark:bg-yellow-800 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <SwitchRightIcon />
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="cryptify" className="w-[60px] pr-4" />
          <span
            className={`${
              isExpanded ? "block" : "hidden"
            } text-yellow-500 font-semibold text-xl`}
          >
            Cryptify
          </span>
        </div>

        {renderNavLinks()}
      </motion.header>
    </>
  );
};

export default Sidebar;


