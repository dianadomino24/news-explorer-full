import RegisterLoginTemplate from '../RegisterLoginTemplate/RegisterLoginTemplate';

function Login({ openPopup, handleLogin, ...props }) {
  const switchForm = () => {
    openPopup('register');
  };

  return (
        <RegisterLoginTemplate
            title='Login'
            switchForm={switchForm}
            handleSubmit={handleLogin}
            buttonName='Log in'
            linkName='Sign up'
            {...props}
        />
  );
}

export default Login;
