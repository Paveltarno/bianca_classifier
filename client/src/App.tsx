import React, { useReducer, Reducer } from 'react';
import { UploadFileArea } from './UploadFileArea';

import icon from './assets/mascot.gif';

import './App.css';
import { SubmitData } from './SubmitData';
import { reducer, initialState } from './reducer';
import { ACTIONS } from './types/Actions';
import { APP_PHASE } from './types/AppPhase';

const POST_URL = '/predict';

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

      {appPhase === APP_PHASE.ERROR && (
        <>
          <p className="error">{`Error: ${error}, please try again`}</p>
          <button
            onClick={() =>
              dispatch({
                type: ACTIONS.RESET,
              })
            }
          >
            Retry
          </button>
        </>
      )}
    </div>
  );
};

export default App;
