import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Player } from "./Player";
import { videoPlayedTime } from "../../store/actions";
import playlist from "./playlist.json";
import {
  PlaylistInnerWrap,
  PlaylistWrap,
  Thumbnail,
  Title,
} from "../Styled/Components.style";

const playerOptions = {};

function Dynamic(props) {
  const [player, setPlayer] = useState(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0.0);
  const [remainingVideoPlay, setRemainingVideoPlay] = useState(0.0);
  const [playState, setPlayState] = useState(true);
  const video = playlist[index];

  useEffect(() => {
    if (player) {
      player.src(video.sources);
    }
  }, [video, player]);

  // auto play next
  useEffect(() => {
    if (player) {
      const onPlayerEnded = () => {
        let nextIndex = index + 1;
        if (!playlist[nextIndex]) {
          nextIndex = 0;
        }

        // history.replace(generatePath(ROUTES.DYNAMIC, { index: nextIndex }));
      };
      props.videoData.map((d) => {
        if (d.index === index) {
          player.currentTime(d.time);
          player.pause();
        }
      });
      player.on("play", (event) => {
        setIsPlaying(true);

        console.log(event, "onPlayEvent");
      });
      player.on("pause", (event) => {
        setIsPlaying(false);
        setPlayState(false);
        console.log(event, "onPlayEvent");
      });
      player.on("timeupdate", (event) => {
        // @ts-ignore
        //this.setState({ playedSeconds: this.player.currentTime() });
        let playedTime = player.currentTime();
        setPlayedSeconds(playedTime);

        // @ts-ignore

        setRemainingVideoPlay(player.remainingTime());
        //  this.setState({ remainingVideoPlay: this.player.remainingTime() });
      });
      player.on("ended", onPlayerEnded);

      return () => {
        player.off("ended", onPlayerEnded);
      };
    }
  }, [player, index]);
  useEffect(() => {
    if (player) {
      //   alert(index);
      console.log(props.videoData, "props.videoData");
      //   props.videoData.map((d) => {
      //     if (d.index === index) {
      //         d.play === false && player.pause();
      //         player.currentTime(d.time);
      //     }
      //   });
    }
  }, [index]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100vw",
      }}
    >
      <Player
        playerOptions={playerOptions}
        onPlayerInit={setPlayer}
        onPlayerDispose={setPlayer}
      />

      <div className="playlist">
        {playlist.map((d, i) => (
          <PlaylistWrap
            className="suggestion-wraps"
            onClick={() => {
              setIndex(i);
              props.onSelectingNextVideo(index, playedSeconds, playState);
            }}
          >
            <PlaylistInnerWrap>
              <Thumbnail src={d.poster} />
              <div>
                <Title>{d.title}</Title>
              </div>
            </PlaylistInnerWrap>
          </PlaylistWrap>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    videoData: state.video.videoRecord,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onSelectingNextVideo: (index, time, play) =>
    dispatch(videoPlayedTime(index, time, play)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dynamic);
