import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const Captions: React.FC<{
  narasi: string;
  frames: number;
  isShorts?: boolean;
}> = ({ narasi, frames, isShorts = false }) => {
  const frame = useCurrentFrame();

  if (!narasi || narasi.trim().length === 0) return null;

  const words = narasi.trim().split(/\s+/);
  if (words.length === 0) return null;

  // Approximate word timing across shot duration
  const framesPerWord = Math.max(1, frames / words.length);
  const activeIndex = Math.min(
    words.length - 1,
    Math.floor(frame / framesPerWord)
  );

  if (isShorts) {
    // Shorts Style: Centered, huge, bold, bouncing yellow/white text
    const wordProgress = (frame % framesPerWord) / framesPerWord;
    const scale = interpolate(wordProgress, [0, 0.3, 1], [0.92, 1.08, 1.0], {
      extrapolateRight: "clamp",
    });

    return (
      <div
        style={{
          position: "absolute",
          top: "52%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          textAlign: "center",
          width: "88%",
          zIndex: 40,
        }}
      >
        <span
          style={{
            fontFamily: "Impact, Arial Black, sans-serif",
            fontSize: 72,
            lineHeight: 1.15,
            color: "#FFDE00",
            textTransform: "uppercase",
            WebkitTextStroke: "12px #000000",
            paintOrder: "stroke fill",
            letterSpacing: 1.5,
            display: "inline-block",
            textShadow: "0 8px 24px rgba(0,0,0,0.8)",
          }}
        >
          {words[activeIndex]}
        </span>
      </div>
    );
  }

  // Long Video Style: Lower-third subtitle banner
  return (
    <div
      style={{
        position: "absolute",
        bottom: 70,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(8px)",
        padding: "10px 28px",
        borderRadius: 24,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        maxWidth: "80%",
        textAlign: "center",
        zIndex: 40,
      }}
    >
      <span
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 28,
          fontWeight: 600,
          color: "#ffffff",
          letterSpacing: 0.3,
          lineHeight: 1.3,
        }}
      >
        {words.map((w, idx) => (
          <span
            key={idx}
            style={{
              color: idx === activeIndex ? "#FFDE00" : "#ffffff",
              fontWeight: idx === activeIndex ? 800 : 500,
              marginRight: 6,
              transition: "color 0.1s ease",
            }}
          >
            {w}
          </span>
        ))}
      </span>
    </div>
  );
};
