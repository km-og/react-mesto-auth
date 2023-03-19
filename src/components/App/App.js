import { useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { getContent } from "../Auth/Auth.js";
import Login from "../Login/Login.js";
import { MainAfterLogIn } from "../MainAfterLogIn/MainAfterLogIn.js";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";
import Register from "../Register/Register.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function changeOnExit() {
    setLoggedIn(false);
  }

  const [userEmail, setUserEmail] = useState(null);

  function handleSubmitForm() {
    setLoggedIn(true);
  }

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      getContent(token).then((res) => {
        console.log(res);
        console.log(res.data.email);
        if (res) {
          const userData = res.data.email;
          console.log(userData);
          setUserEmail(userData);

          setLoggedIn(true);
          navigate("/");
        }
      });
    }
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/sign-up" element={<Register loggedIn={loggedIn} />} />
        <Route
          path="/sign-in"
          element={
            <Login loggedIn={loggedIn} onSubmitForm={handleSubmitForm} />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={MainAfterLogIn}
              loggedIn={loggedIn}
              userEmail={userEmail}
              isChangeOnExit={changeOnExit}
              // onSubmitForm={handleSubmitForm}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
