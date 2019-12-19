import React, { useCallback } from 'react';
import axios from 'axios';

export const SubmitData = ({
  url,
  file,
  onRequest,
  onResponse,
  onError,
}: {
  url: string;
  file: File;
  onRequest: () => any;
  onError: (err: string | Error) => any;
  onResponse: (body: string) => any;
}) => {
  const onClick = useCallback(async () => {
    onRequest();

    try {
      const response = await axios.post(url, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onResponse(response.data);
    } catch (err) {
      onError(err);
    }
  }, [file]);

  return (
    <button onClick={onClick} className="submitButton">
      ✨ Check ✨
    </button>
  );
};
