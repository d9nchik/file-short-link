import React, { FunctionComponent, useState } from 'react';
import { loginWithGoogle } from '../data/auth';

interface IProps {
  updateAdminPage: () => void;
}

const Login: FunctionComponent<IProps> = ({ updateAdminPage }: IProps) => {
  const [message, setMessage] = useState('');
  return (
    <div>
      <h3>{message}</h3>
      <button
        onClick={async () => {
          const result = await loginWithGoogle();
          if (result) {
            setMessage(result);
          } else {
            updateAdminPage();
          }
        }}
      >
        Login with Google!
      </button>
    </div>
  );
};

export default Login;
