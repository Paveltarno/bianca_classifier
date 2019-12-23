import React, { useReducer, Reducer } from 'react';
import { UploadFileArea } from './UploadFileArea';

import icon from './assets/mascot.gif';
import example1 from './assets/bianca_1.jpeg';
import example2 from './assets/bianca_2.jpeg';
import example3 from './assets/bianca_3.jpeg';

import './App.css';
import { SubmitData } from './SubmitData';
import { reducer, initialState } from './reducer';
import { ACTIONS } from './types/Actions';
import { APP_PHASE } from './types/AppPhase';
import { Prediction, PREDICTION_CLASS } from './types/Prediction';

const POST_URL = '/predict';

const RetryButton = ({ dispatch }) => (
  <button
    onClick={() =>
      dispatch({
        type: ACTIONS.RESET,
      })
    }
  >
    Retry
  </button>
);

const formatPredictions = (predictions: Array<Prediction>) => {
  const prediction = predictions[0];
  switch (prediction[0]) {
    case PREDICTION_CLASS.bianca:
      return `That's Bianca!`;
    case PREDICTION_CLASS.maltese:
      return `That's not Bianca! It's some other Maltese`;
    default:
      return `That's not bianca...`;
  }
};

const App: React.FC = () => {
  const [{ selectedFile, appPhase, error, result }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Is this.. Bianca?</h1>
        <img className="spinning-icon" src={icon}></img>
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

      {(appPhase === APP_PHASE.INIT || appPhase === APP_PHASE.LOADED) && (
        <SubmitData
          disabled={appPhase === APP_PHASE.INIT}
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

      {appPhase === APP_PHASE.REQUEST && <button disabled>Submitting</button>}

      {appPhase === APP_PHASE.RESULT && (
        <>
          <RetryButton dispatch={dispatch} />
          <p className="result">
            {formatPredictions(result?.predictions as any)}
          </p>
        </>
      )}

      {appPhase === APP_PHASE.ERROR && (
        <>
          <RetryButton dispatch={dispatch} />
          <p className="error">{`Error: ${error}, please try again`}</p>
        </>
      )}

      <footer className="app-footer">
        <section>
          <span>Download test images </span>
          <a download href={example1}>[1]</a>
          <a download href={example2}>[2]</a>
          <a download href={example3}>[3]</a>
        </section>
        <a href="https://github.com/Paveltarno/bianca_classifier">source</a>
      </footer>
    </div>
  );
};

export default App;
