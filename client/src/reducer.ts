import { Reducer } from "react";
import { APP_PHASE } from "./types/AppPhase";
import { PreviewFile } from "./types/PreviewFile";
import { ACTIONS } from "./types/Actions";
import { Prediction } from "./types/Prediction";

interface State {
  selectedFile?: PreviewFile;
  error?: string;
  result?: {
    predictions: Array<Prediction>
  },
  appPhase: APP_PHASE;
}

export const initialState: State = {
  selectedFile: undefined,
  error: undefined,
  appPhase: APP_PHASE.INIT,
  result: undefined,
};

export const reducer: Reducer<State, any> = (state, action) => {
  switch (action.type) {
    case ACTIONS.FILE_SELECTED:
      return {
        ...state,
        appPhase: APP_PHASE.LOADED,
        selectedFile: action.selectedFile,
      };
    case ACTIONS.REQ_SUBMITTED:
      return {
        ...state,
        appPhase: APP_PHASE.REQUEST,
      };
    case ACTIONS.REQ_ERR:
      return {
        ...state,
        appPhase: APP_PHASE.ERROR,
        error: action.body,
      };
    case ACTIONS.REQ_COMPLETED:
      return {
        ...state,
        appPhase: APP_PHASE.RESULT,
        result: action.body,
      };
    case ACTIONS.RESET:
      return initialState
    default:
      return state;
  }
};