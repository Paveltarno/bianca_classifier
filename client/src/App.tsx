import React from 'react';
import { UploadFileArea } from './UploadFileArea';
import icon from './assets/mascot.gif';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="AppHeader">
        <h1>Is this.. Bianca?</h1>
        <img className="icon" src={icon}></img>
      </header>

      <UploadFileArea />
    </div>
  );
};

export default App;
