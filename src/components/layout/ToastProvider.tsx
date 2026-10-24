"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={10}
      containerClassName="!top-3 sm:!top-5"
      toastOptions={{
        duration: 3800,
        style: {
          background: "#10281d",
          color: "#fffdf7",
          borderRadius: "14px",
          padding: "10px 15px",
          fontSize: "13px",
          fontWeight: 500,
          maxWidth: "min(92vw, 430px)",
          boxShadow: "0 18px 45px -20px rgba(11,33,23,0.65)",
          fontFamily: "var(--font-hind), sans-serif",
        },
        success: {
          iconTheme: { primary: "#e3ac3e", secondary: "#10281d" },
        },
        error: {
          style: {
            background: "#c84937",
            color: "#fffdf7",
            borderRadius: "14px",
            padding: "10px 15px",
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: "var(--font-hind), sans-serif",
          },
          iconTheme: { primary: "#fffdf7", secondary: "#c84937" },
        },
      }}
    />
  );
}
