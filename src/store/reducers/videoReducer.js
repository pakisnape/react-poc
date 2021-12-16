import * as actionTypes from "../actions/actionTypes";

const intitalState = {
  videoRecord: [
    { index: 0, time: 0.0, play:true },
    { index: 1, time: 0.0, play:true },
    { index: 2, time: 0.0, play:true },
    { index: 3, time: 0.0, play:true },
    { index: 4, time: 0.0, play:true },
    { index: 5, time: 0.0, play:true },
  ],
};
const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case actionTypes.VIDEO_PLAYED_TIME:
      return {
        ...state,
        videoRecord: state.videoRecord.map((d) => {
          let tempObj = { ...d };
          if (d.index === action.payload.index) {
            tempObj.time = action.payload.time;
            tempObj.play = action.payload.play;
          }
          return tempObj;
        }),
      };
    default:
      return state;
  }
};
export default reducer;
