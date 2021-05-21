import React, { FunctionComponent, useState, useEffect } from 'react';
import { firestore as db } from '../firebase';
import { LinkObj } from '../data/storage';
import WatchLink from './WatchLink';

const WatchLinks: FunctionComponent = () => {
  const [links, setLinks] = useState<LinkObj[]>([]);
  useEffect(() => {
    return db.collection('links').onSnapshot(doc => {
      const data = doc.docs.map(doc => doc.data()) as LinkObj[];
      setLinks(data);
    });
  });
  return (
    <ul>
      {links.map(link => (
        <WatchLink
          {...link}
          key={link.fileName + link.filePath + link.smallLink}
        />
      ))}
    </ul>
  );
};

export default WatchLinks;
