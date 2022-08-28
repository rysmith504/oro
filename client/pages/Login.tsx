import React, { DOMAttributes } from 'react';
import GoogleButton from 'react-google-button';
import { useTheme } from '@mui/material/styles';


interface HTMLAttributes<T> extends DOMAttributes<T> {
  align: any;
}


const Login = () => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const redirectToGoogle = () => {
    window.open('/auth/google', '_self');
  };

  return (
    <div data-align='center'>
      <br></br>
      <h3>
        Please Login to Use Our App
      </h3>
      <form action="/auth/google" >
        <GoogleButton onClick={redirectToGoogle} id='google-button' />
      </form>
    </div>
  );
};

export default Login;
