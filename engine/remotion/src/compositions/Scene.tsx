import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { StillShot, ShotData } from "../components/StillShot";
import { VideoShot } from "../components/VideoShot";
import { Captions } from "../components/Captions";
import { Watermark } from "../components/Watermark";

export type SceneData = {
  scene: number;
  fps: number;
  audio: string;
  totalFrames: number;
  shots: ShotData[];
};

export const Scene: React.FC<{
  data: SceneData;
  isShorts?: boolean;
  watermark?: string;
}> = ({ data, isShorts = false, watermark = "@yourchannel" }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f19" }}>
      {data.shots.map((shot) => (
        <Sequence
          key={shot.num}
          from={shot.from}
          durationInFrames={shot.frames}
        >
          {shot.kind === "video" ? (
            <VideoShot shot={shot} />
          ) : (
            <StillShot shot={shot} />
          )}
          <Captions
            narasi={shot.narasi}
            frames={shot.frames}
            isShorts={isShorts}
          />
        </Sequence>
      ))}

      {data.audio ? (
        <Audio src={staticFile(data.audio)} volume={1.8} />
      ) : null}

      <Watermark text={watermark} isShorts={isShorts} />
    </AbsoluteFill>
  );
};
