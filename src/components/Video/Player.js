import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "./player.css";
import "videojs-plus";
import "videojs-plus/dist/videojs-plus.css";

const defaultPlayerOptions = {
  autoplay: true,
  muted: true,
  aspectRatio: "16:9",
  mobileView: false,
};

export function Player({
  children,
  playerOptions,
  onPlayerInit,
  onPlayerDispose,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const videoEl = containerRef.current.querySelector("video");
      const player = videojs(videoEl, {
        ...defaultPlayerOptions,
        ...playerOptions,
      });

      const playerEl = player.el();
      const flag = player.getChild("PlayToggleLayer").el();
      for (const child of containerRef.current.children) {
        if (child !== playerEl) {
          playerEl.insertBefore(child, flag);
        }
      }

      onPlayerInit && onPlayerInit(player);

      window.player = player;

      return () => {
        onPlayerDispose && onPlayerDispose(null);
        player.dispose();
      };
    }
  }, [onPlayerInit, onPlayerDispose, playerOptions]);

  return (
    <div className="player" ref={containerRef}>
      <video />
      {children}
    </div>
  );
}
