"use client";
import { useState, useEffect } from "react";

export default function SplashScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); // Duração da splash

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-50 bg-blue-700 text-white flex items-center justify-center text-3xl font-bold transition-opacity duration-700 opacity-100">
          V-MAP 🚍
        </div>
      ) : (
        <div className="fade-in">{children}</div>
      )}
    </>
  );
}
