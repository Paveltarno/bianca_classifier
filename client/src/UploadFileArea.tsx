import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import './UploadFileArea.css';
import PlaceholderImage from './assets/dog_placeholder.png';
import { PreviewFile } from './types/PreviewFile';

const Placeholder = () => (
  <>
    <img className="preview-image" src={PlaceholderImage} />
    <h2 className="upload-file-caption">
      Drop or click to upload a doggy photo
    </h2>
  </>
);

const Preview = ({ previewFile }: { previewFile: PreviewFile }) => (
  <img className="preview-image" src={previewFile.preview} />
);

export const UploadFileArea = ({
  file,
  onFileSelected,
}: {
  file?: PreviewFile;
  onFileSelected: (file: PreviewFile) => any;
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: ([file, ..._]) => {
      onFileSelected(
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
    },
    accept: 'image/*',
    maxSize: 1e7, // 10 MB
  });

  useEffect(() => () => file && URL.revokeObjectURL(file.preview), [file]);

  return (
    <div className="upload-file-area" {...getRootProps()}>
      <input {...getInputProps()} />
      {file ? <Preview previewFile={file} /> : <Placeholder />}
    </div>
  );
};
