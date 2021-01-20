import RegisterLoginTemplate from '../RegisterLoginTemplate/RegisterLoginTemplate';

function Login({
  openPopup, handleLogin, setErrorTotal, ...props
}) {
  const switchForm = () => {
    openPopup('register');
    setErrorTotal('');
  };

  return (
        <RegisterLoginTemplate
            title='Login'
            switchForm={switchForm}
            handleSubmit={handleLogin}
            buttonName='Log in'
            linkName='Sign up'
            setErrorTotal={setErrorTotal}
            {...props}
        />
  );
}

export default Login;
