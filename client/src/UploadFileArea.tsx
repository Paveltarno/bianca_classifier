import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import './UploadFileArea.css';
import PlaceholderImage from './assets/dog_placeholder.png';

type PreviewFile = File & { preview: string };

const Placeholder = () => (
  <>
    <img src={PlaceholderImage} />
    <h2 className="upload-file-caption">
      Drop or click to upload a doggy photo
    </h2>
  </>
);

const Preview = ({ previewFile }: { previewFile: PreviewFile }) => (
  <img src={previewFile.preview} />
);

export const UploadFileArea = () => {
  const [previewFile, setPreviewFile] = useState<PreviewFile>();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: ([file, ...rest]) => {
      setPreviewFile({
        ...file,
        preview: URL.createObjectURL(file),
      });
    },
    accept: 'image/*',
    maxSize: 1e7, // 10 MB
  });

  useEffect(
    () => () => previewFile && URL.revokeObjectURL(previewFile.preview),
    [previewFile]
  );

  return (
    <div className="upload-file-area" {...getRootProps()}>
      <>
        <input {...getInputProps()} />
        {previewFile ? <Preview previewFile={previewFile} /> : <Placeholder />}
      </>
    </div>
  );
};
