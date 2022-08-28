import React from 'react';
import GoogleButton from 'react-google-button';

const Login = () => {

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
        <GoogleButton onClick={ redirectToGoogle } id='google-button'/>
      </form>
    </div>
  );
};

export default Login;
