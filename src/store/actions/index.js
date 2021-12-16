import * as actionTypes from "./actionTypes";

export const videoPlayedTime = (index, time, play) => {
  return {
    type: actionTypes.VIDEO_PLAYED_TIME,
    payload: { index, time, play },
  };
};
