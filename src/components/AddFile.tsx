import React, { FunctionComponent, useState, useRef } from 'react';
import { uploadFile, addSmallLink } from '../data/storage';

const AddFile: FunctionComponent = () => {
  const [fileName, setFileName] = useState('');
  const file = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  return (
    <div>
      <h2>Add file</h2>
      {message}
      <form
        onSubmit={async e => {
          e.preventDefault();
          if (file.current && file.current.files && file.current.files[0]) {
            const link = await uploadFile(file.current.files[0]);
            const result = await addSmallLink(link, fileName);
            if (result) {
              setMessage(result);
            } else {
              setFileName('');
              file.current.value = '';
            }
          }
        }}
      >
        <label>
          Name of file
          <input
            type="text"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            required
          />
        </label>
        <label>
          Your file
          <input type="file" ref={file} required />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddFile;
