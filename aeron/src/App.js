import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/mainPage/mainPage";
import Loading from "./components/loading/loading";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;