import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../Auth/Auth";
import AuthForm from "../AuthForm/AuthForm";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function Register({ loggedIn, onClick }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [isAccess, setIsAccess] = useState();

  function handleSignUp() {
    setIsAccess(true);
  }

  function handleNotSignUp() {
    setIsAccess(false);
  }

  const navigate = useNavigate();

  const [isInfoTooltip, setIsInfoToolTip] = useState(false);

  function openInfoTolltip() {
    setIsInfoToolTip(true);
  }

  function closeInfoTolltip() {
    setIsInfoToolTip(false);
    navigate("/sign-in");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    auth
      .register(email, password, handleSignUp, handleNotSignUp)
      .then((res) => {
        openInfoTolltip();
        return res;
      });
  }

  const { email, password } = formValue;

  return (
    <>
      <Header textLink="Войти" loggedIn={loggedIn} link="/sign-in" />
      <AuthForm
        title="Регистрация"
        textBtn="Зарегистрироваться"
        signUp={"Уже зарегистрированы? Войти"}
        onClick={onClick}
        onSubmitForm={handleSubmit}
        onChangeInput={handleChange}
        formValue={formValue}
      />

      <InfoTooltip
        isOpen={isInfoTooltip}
        onClose={closeInfoTolltip}
        isSuccessful={isAccess}
      />
    </>
  );
}

export default Register;
