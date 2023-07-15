import { useEffect, useState } from 'react';
import Box from "./components/Box";
import Navbar from "./components/Navbar";

function App() {
  const [orientation, setOrientation] = useState('');

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
      );
    };

    handleOrientationChange();

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  const shouldShowRotateMessage = orientation === 'portrait';

  return (
    <div className="bg-cover relative">
      {shouldShowRotateMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white text-center">
          <p className="text-lg">
            Please rotate your phone to view this page.
          </p>
        </div>
      )}

      <div className={shouldShowRotateMessage ? 'hidden' : ''}>
        <Navbar />
        <Box />
      </div>
    </div>
  );
}

export default App;
