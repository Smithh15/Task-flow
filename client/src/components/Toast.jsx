import React, { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  const base = "fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg font-medium text-sm z-50 transition-all";
  const styles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
  };

  return (
    <div className={`${base} ${styles[type]} animate-fade-in`}>
      {message}
    </div>
  );
}
