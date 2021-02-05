import './RegisterSuccess.css';

function RegisterSuccess({ openPopup }) {
  const handleLogin = () => {
    openPopup('login');
  };

  return (
        <div className="register-success">
            <h2 className="popup__title register-success__title ">
                You've successfully registered!
            </h2>
            <button
                className="popup__link register-success__link"
                onClick={handleLogin}
            >
                Log in
            </button>
        </div>
  );
}

export default RegisterSuccess;
