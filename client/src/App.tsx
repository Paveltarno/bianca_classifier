import React, { useState } from 'react';
import { UploadFileArea } from './UploadFileArea';

import { PreviewFile } from './types/PreviewFile';
import icon from './assets/mascot.gif';

import './App.css';

const App: React.FC = () => {

  const [previewFile, setPreviewFile] = useState<PreviewFile>();

  return (
    <div className="App">
      <header className="AppHeader">
        <h1>Is this.. Bianca?</h1>
        <img className="icon" src={icon}></img>
      </header>

      <UploadFileArea file={previewFile} onFileSelected={setPreviewFile} />

      {previewFile && <button className="submitButton">Check</button>}
    </div>
  );
};

export default App;
