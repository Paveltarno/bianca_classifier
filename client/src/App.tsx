import React, { useReducer, Reducer } from 'react';
import { UploadFileArea } from './UploadFileArea';

import icon from './assets/mascot.gif';

import './App.css';
import { SubmitData } from './SubmitData';
import { PreviewFile } from './types/PreviewFile';

const POST_URL = '/predict';

enum ACTIONS {
  FILE_SELECTED,
  REQ_SUBMITTED,
  REQ_ERR,
  REQ_COMPLETED,
  RESET,
}

enum APP_PHASE {
  INIT,
  LOADED,
  REQUEST,
  RESULT,
  ERROR,
}

interface State {
  selectedFile?: PreviewFile;
  error?: string;
  appPhase: APP_PHASE;
}

const initialState: State = {
  selectedFile: undefined,
  error: undefined,
  appPhase: APP_PHASE.INIT,
};

const reducer: Reducer<State, any> = (state, action) => {
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

const App: React.FC = () => {
  const [{ selectedFile, appPhase, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <header className="AppHeader">
        <h1>Is this.. Bianca?</h1>
        <img className="icon" src={icon}></img>
      </header>

      <UploadFileArea
        file={selectedFile}
        onFileSelected={selectedFile => {
          dispatch({
            type: ACTIONS.FILE_SELECTED,
            selectedFile,
          });
        }}
      />

      {appPhase === APP_PHASE.LOADED && (
        <SubmitData
          url={POST_URL}
          file={selectedFile as File}
          onRequest={() =>
            dispatch({
              type: ACTIONS.REQ_SUBMITTED,
            })
          }
          onError={err =>
            dispatch({
              type: ACTIONS.REQ_ERR,
              body: err,
            })
          }
          onResponse={res =>
            dispatch({
              type: ACTIONS.REQ_COMPLETED,
              body: res,
            })
          }
        />
      )}

      {appPhase === APP_PHASE.ERROR && <><p className="error">{`Error: ${error}, please try again`}</p>
          <button onClick={ () =>
            dispatch({
              type: ACTIONS.RESET
            })
          }>Retry</button>
      </>}

    </div>
  );
};

export default App;
