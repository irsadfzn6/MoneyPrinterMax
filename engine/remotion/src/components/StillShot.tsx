import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

export type ShotData = {
  num: number;
  narasi: string;
  gerak: string;
  file: string;
  kind: "image" | "video";
  from: number;
  frames: number;
};

export const StillShot: React.FC<{ shot: ShotData }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, Math.max(1, shot.frames - 1)], [0, 1], {
    extrapolateRight: "clamp",
  });
  const g = (shot.gerak || "").toLowerCase();

  let scale = 1.08;
  let x = 0;
  let y = 0;

  if (g.includes("zoom in")) {
    scale = interpolate(t, [0, 1], [1.0, 1.15]);
  } else if (g.includes("zoom out")) {
    scale = interpolate(t, [0, 1], [1.15, 1.0]);
  } else if (g.includes("pan kanan")) {
    scale = 1.12;
    x = interpolate(t, [0, 1], [-3, 3]);
  } else if (g.includes("pan kiri")) {
    scale = 1.12;
    x = interpolate(t, [0, 1], [3, -3]);
  } else if (g.includes("pan bawah") || g.includes("tilt bawah")) {
    scale = 1.12;
    y = interpolate(t, [0, 1], [-3, 3]);
  } else if (g.includes("pan atas") || g.includes("tilt atas")) {
    scale = 1.12;
    y = interpolate(t, [0, 1], [3, -3]);
  } else if (g.includes("shake") || g.includes("quake")) {
    scale = 1.08;
    x = Math.sin(frame * 1.7) * 0.8;
    y = Math.cos(frame * 2.3) * 0.8;
  }

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#0b0f19" }}>
      <Img
        src={staticFile(shot.file)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `translate(${x}%, ${y}%) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};
