import React, { FunctionComponent, useState } from 'react';
import { isAuthenticated as isAuth, getUser, logout } from '../data/auth';
import Login from './Login';
import AddFile from './AddFile';

import ReactLogo from '../logo.svg';
import WatchLinks from './WatchLinks';

const AdminPage: FunctionComponent = () => {
  const [isAuthenticated, setAuthenticated] = useState(isAuth());
  const updatePage = () => setAuthenticated(isAuth());
  if (!isAuthenticated) {
    return <Login updateAdminPage={updatePage} />;
  }
  const user = getUser();
  if (!user) {
    return <div>Reload page!</div>;
  }
  return (
    <div>
      <img
        alt={user.displayName || ''}
        src={user.photoURL || ReactLogo}
        onClick={() => {
          logout();
          setAuthenticated(false);
        }}
      />
      <AddFile />
      <h2>All links</h2>
      <WatchLinks />
    </div>
  );
};

export default AdminPage;
