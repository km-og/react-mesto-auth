import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Header from "../Header/Header";
import * as auth from "../Auth/Auth";
import { useNavigate } from "react-router-dom";

// компонент авторизации пользователя с необходимыми стейт-переменными.

function Login({ loggedIn, onSubmitForm }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setFormValue({ email: "", password: "" });
          onSubmitForm();
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  const { email, password } = formValue;

  return (
    <>
      <Header textLink="Регистрация" loggedIn={loggedIn} link="/sign-up" />
      <AuthForm
        title="Вход"
        textBtn="Войти"
        onSubmitForm={handleSubmit}
        onChangeInput={handleChange}
        formValue={formValue}
      />
    </>
  );
}

export default Login;
