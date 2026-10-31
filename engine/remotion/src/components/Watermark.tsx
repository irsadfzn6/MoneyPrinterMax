import React from "react";

export const Watermark: React.FC<{ text?: string; isShorts?: boolean }> = ({
  text = "@yourchannel",
  isShorts = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: isShorts ? 60 : 36,
        right: isShorts ? 40 : 48,
        padding: "6px 16px",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(6px)",
        borderRadius: 20,
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        fontSize: isShorts ? 26 : 20,
        letterSpacing: 0.5,
        zIndex: 50,
      }}
    >
      {text}
    </div>
  );
};
