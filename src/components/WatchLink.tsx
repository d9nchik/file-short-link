import React, { FunctionComponent } from 'react';
import { LinkObj } from '../data/storage';

const WatchLink: FunctionComponent<LinkObj> = ({
  smallLink,
  fileName,
  filePath,
}: LinkObj) => {
  return (
    <li>
      Small link:
      <a href={`/${smallLink}`}>{`/${smallLink}`}</a> ={' '}
      <a href={filePath}>{fileName}</a>
    </li>
  );
};

export default WatchLink;
