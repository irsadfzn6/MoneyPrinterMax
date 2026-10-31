import React from "react";
import { Composition, Series } from "remotion";
import { Scene, SceneData } from "./compositions/Scene";

// Helper to safely import data or fallback to empty
function loadScenes(): SceneData[] {
  const loaded: SceneData[] = [];
  for (let i = 1; i <= 20; i++) {
    try {
      const data = require(`./data/adegan${i}.json`);
      if (data && data.shots) loaded.push(data as SceneData);
    } catch (e) {
      break;
    }
  }
  return loaded;
}

const scenes = loadScenes();
const totalFrames = scenes.reduce((acc, s) => acc + s.totalFrames, 0);

const FullSeries: React.FC<{ scenes: SceneData[]; isShorts?: boolean }> = ({
  scenes,
  isShorts = false,
}) => {
  return (
    <Series>
      {scenes.map((scene) => (
        <Series.Sequence
          key={scene.scene}
          durationInFrames={scene.totalFrames}
        >
          <Scene data={scene} isShorts={isShorts} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

export const Root: React.FC = () => {
  return (
    <>
      {/* 1. Long Video (Landscape 16:9 Full HD) */}
      <Composition
        id="LongVideo"
        component={FullSeries}
        durationInFrames={Math.max(1, totalFrames)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ scenes, isShorts: false }}
      />

      {/* 2. Shorts Video (Portrait 9:16 Full HD) */}
      <Composition
        id="ShortsVideo"
        component={FullSeries}
        durationInFrames={Math.max(1, totalFrames)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ scenes, isShorts: true }}
      />

      {/* Individual Scene Compositions */}
      {scenes.map((s) => (
        <React.Fragment key={s.scene}>
          <Composition
            id={`Adegan${s.scene}`}
            component={Scene}
            durationInFrames={s.totalFrames}
            fps={s.fps}
            width={1920}
            height={1080}
            defaultProps={{ data: s, isShorts: false }}
          />
          <Composition
            id={`ShortsAdegan${s.scene}`}
            component={Scene}
            durationInFrames={s.totalFrames}
            fps={s.fps}
            width={1080}
            height={1920}
            defaultProps={{ data: s, isShorts: true }}
          />
        </React.Fragment>
      ))}
    </>
  );
};
