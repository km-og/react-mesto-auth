const baseUrl = "https://auth.nomoreparties.co";

const register = (email, password, handleSignUp, handleNotSignUp) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      try {
        if (response.status === 200 || response.status === 201) {
          handleSignUp();
          return response.json();
        } else if (response.status === 400) {
          handleNotSignUp();
          console.log("некорректно заполнено одно из полей ");
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};

// email1111111111@yandex.ru
// somepassword

const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      try {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          console.log("не передано одно из полей");
        } else if (response.status === 401) {
          console.log("пользователь с email не найден ");
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        return res;
      }
    })
    .catch((err) => console.log(err));
};

const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        console.log("Токен не передан или передан не в том формате");
      } else if (response.status === 401) {
        console.log("Переданный токен некорректен");
      }
    })
    .catch((err) => console.log(err));
};

export { baseUrl, register, authorize, getContent };
