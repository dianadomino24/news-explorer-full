import RegisterLoginTemplate from '../RegisterLoginTemplate/RegisterLoginTemplate';

function Register({
  openPopup, handleRegister, setErrorTotal, ...props
}) {
  const switchForm = () => {
    openPopup('login');
    setErrorTotal('');
  };

  return (
        <RegisterLoginTemplate
            title='Sign up'
            switchForm={switchForm}
            handleSubmit={handleRegister}
            buttonName='Sign up'
            linkName='Log in'
            setErrorTotal={setErrorTotal}
            {...props}
        />
  );
}

export default Register;
