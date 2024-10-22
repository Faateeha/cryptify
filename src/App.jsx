import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../src/components/Dashboard';
import Sidebar from './components/Sidebar';
import DetailsPage from './components/DetailsPage';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode by adding/removing the 'dark' class to the <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`flex w-full h-full dark:text-darktheme-text dark:bg-darktheme-background`}>
      {/* Sidebar with fixed width */}
      <Sidebar className="w-1/4 h-full" />
      
      {/* Main content takes the remaining width */}
      <div className="flex-grow h-full">
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/coin/:id' element={<DetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;


