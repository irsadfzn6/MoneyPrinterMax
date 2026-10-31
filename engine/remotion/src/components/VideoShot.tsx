import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { ShotData } from "./StillShot";

const VIDEO_SOURCE_FRAMES = 4 * 30; // 4s Omni Flash @ 30fps = 120 frames

export const VideoShot: React.FC<{ shot: ShotData }> = ({ shot }) => {
  const style = { width: "100%", height: "100%", objectFit: "cover" as const };
  // Dynamic playbackRate: if shot frames > 120, smoothly slow down to avoid freeze
  const rate =
    shot.frames > VIDEO_SOURCE_FRAMES
      ? VIDEO_SOURCE_FRAMES / shot.frames
      : 1.0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f19" }}>
      <OffthreadVideo
        src={staticFile(shot.file)}
        muted
        style={style}
        playbackRate={rate}
      />
    </AbsoluteFill>
  );
};
