import React, { useState, useContext } from "react";
import signinimage from "../img/loginpageimage.jpg";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("./signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();

    if (!res.ok) {
      window.alert("Invalid credientials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successfull");
      history.push("/");
    }
  };

  return (
    <>
      <div className="container-fluid pb-5 login_container ">
        <div className="login-content">
          <div className="login_image_side">
            <div className="login-image ">
              <img
                // style={{ height: "45vh" }}
                src={signinimage}
                alt="signin pic"
              />
            </div>
            <NavLink
              to="/signup"
              className="login-image-link redirect_link_desktop"
            >
              <p className="login_page_redirect"> Create an Account</p>
            </NavLink>
          </div>
          <div className="login-form  ">
            <h2 className="form-title">Sign in</h2>
            <form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              <div className="redirect_link_phone">
                <NavLink to="/signup" className="login-image-link">
                  <p className="signup_page_redirect"> create an account</p>
                </NavLink>
              </div>
              <div className="form-group1 form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Sign In"
                  onClick={loginUser}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
