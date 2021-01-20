import RegisterLoginTemplate from '../RegisterLoginTemplate/RegisterLoginTemplate';

function Register({ openPopup, handleRegister, ...props }) {
  const switchForm = () => {
    openPopup('login');
  };

  return (
        <RegisterLoginTemplate
            title='Sign up'
            switchForm={switchForm}
            handleSubmit={handleRegister}
            buttonName='Sign up'
            linkName='Log in'
            {...props}
        />
  );
}

export default Register;
