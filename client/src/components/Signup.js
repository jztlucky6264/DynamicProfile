import React, { useState } from "react";
import signupimage from "../img/signup.jpg";
import { NavLink, useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSignupData({ ...signupData, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = signupData;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      window.alert("INvalid Registration");
      console.log("INvalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");

      history.push("/login");
    }
  };

  return (
    <>
      <div className="container-fluid  signup_container  mt-5">
        <div className="signup-content row">
          <div className="signup-form col-6 col-md-6">
            <div className="page_about">
              <h2 className="form-title">Sign up</h2>
            </div>
            <div meth="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={signupData.name}
                  onChange={handleInputs}
                  placeholder="your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={signupData.email}
                  onChange={handleInputs}
                  placeholder="your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={signupData.phone}
                  onChange={handleInputs}
                  placeholder="your phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="work">
                  <i className="zmdi zmdi-slideshow"></i>
                </label>
                <input
                  type="text"
                  name="work"
                  id="work"
                  value={signupData.work}
                  onChange={handleInputs}
                  placeholder="your profession"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={signupData.password}
                  onChange={handleInputs}
                  placeholder="your password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  type="text"
                  name="cpassword"
                  id="cpassword"
                  value={signupData.cpassword}
                  onChange={handleInputs}
                  placeholder="confirm your password"
                />
              </div>
              <div className="redirect_link_phone">
                <NavLink to="/login" className="signup-image-link">
                  <p className="login_page_redirect"> I am already register</p>
                </NavLink>
              </div>

              <div className="form-group1 form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Register"
                  onClick={PostData}
                />
              </div>
            </div>
          </div>
          <div className="signup_image_side  col-md-4 col-4">
            <div className="signup-image">
              <img src={signupimage} alt="registration pic" />
            </div>
            <NavLink
              to="/login"
              className="signup-image-link redirect_link_desktop"
            >
              <p className="login_page_redirect"> I am already register</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
