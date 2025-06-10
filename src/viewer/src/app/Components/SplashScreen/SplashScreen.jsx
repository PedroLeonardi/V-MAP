"use client";
import { useState, useEffect } from "react";

export default function SplashScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, ); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-700 opacity-90">
          <img src="/Logo.png" alt="Logo" className="w-40 animate-pulse" />
        </div>
      ) : (
        <div className="animate-fade-in">{children}</div>
      )}
    </>
  );
}
