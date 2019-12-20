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
  file: any;
  onRequest: () => any;
  onError: (err: string | Error) => any;
  onResponse: (body: string) => any;
}) => {
  const onClick = useCallback(async () => {
    onRequest();

    try {
      const formdata = new FormData();
      formdata.append("file", file)
      const response = await axios.post(url, formdata);
      onResponse(response.data);
    } catch (err) {
      debugger;
      onError(err);
    }
  }, [file]);

  return (
    <button onClick={onClick} className="submitButton">
      ✨ Check ✨
    </button>
  );
};
