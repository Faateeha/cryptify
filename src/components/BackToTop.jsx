import  { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Monitor scrolling to show/hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-yellow-500 text-white p-3 rounded-md shadow-lg hover:bg-yellow-700 transition-opacity duration-300"
        >
          <ArrowUpwardIcon />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
