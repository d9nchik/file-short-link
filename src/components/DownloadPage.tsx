import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLinkObjByShortLink } from '../data/storage';

interface ParamTypes {
  id: string;
}

const DownloadPage: FunctionComponent = () => {
  const { id: shortLink } = useParams<ParamTypes>();
  const [fullPath, setFullPath] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const anchor = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    (async () => {
      const result = await getLinkObjByShortLink(shortLink);
      if (!result) {
        return;
      }
      setFullPath(result.filePath);
      setFileName(result.fileName);
    })();
  });

  if (!fullPath) {
    return (
      <div>
        <h1>404 not found!</h1>
      </div>
    );
  }
  if (anchor.current) anchor.current.click();

  return (
    <div>
      <h1>{fileName}</h1>
      <a href={fullPath} ref={anchor}>
        <button>Download!</button>
      </a>
    </div>
  );
};

export default DownloadPage;
