import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/components/Dashboard";
import Sidebar from "./components/Sidebar";
import DetailsPage from "./components/DetailsPage";
import "./index.css";

// Create a context for dark mode
export const DarkModeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div
        className={`flex w-full h-full dark:text-darktheme-text dark:bg-darktheme-background`}
      >
        {/* Sidebar with fixed width */}
        <Sidebar className="w-1/4 h-full" />

        {/* Main content takes the remaining width */}
        <div className="flex-grow h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/coin/:id" element={<DetailsPage />} />
          </Routes>
        </div>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;



