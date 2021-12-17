import React, { useState, useEffect } from "react";
import "./component.css";
import { useHistory } from "react-router-dom";
import MapIcon from "@material-ui/icons/Map";
import EmailIcon from "@material-ui/icons/Email";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
const Contact = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const callaboutPage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setUserData({
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.ok === 200) {
        const error = new Error(res.error);
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      //history.push("/login");
    }
  };
  useEffect(() => {
    callaboutPage();
  }, []);

  //we are storing data in states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };
  //send the data to backend
  const handleContactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();

    if (!data) {
      console.log("message not send");
    } else {
      alert("message send");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="container icon_bar_div">
        <div className="row mx-auto  mt-5 g-3  ">
          <div className="contact_user container col-10 offset-md-1 col-lg-3    col-md-3   ">
            <div className="icons iconphone">
              <PhoneAndroidIcon className="icon phone_icon" />
            </div>
            <div className="contact_user_info  d-flex justify-content-between align-content-center flex-column">
              <h2>Phone</h2>
              <p>+91 {userData.phone}</p>
            </div>
          </div>

          <div className="contact_user container col-10 offset-md-1 col-md-3 col-lg-3    ">
            <div className="icons iconemail">
              <EmailIcon className="icon email_icon" />
            </div>
            <div className="contact_user_info d-flex justify-content-between align-content-center flex-column">
              <h2>Email</h2>
              <p>{userData.email}</p>
            </div>
          </div>

          <div className="contact_user container offset-md-1  col-10   col-md-3 col-lg-3   ">
            <div className="icons iconaddress">
              <MapIcon className="icon map_icon" />
            </div>
            <div className="contact_user_info d-flex justify-content-between align-content-center flex-column">
              <h2>Address</h2>
              <p>Delhi sonia vihar</p>
            </div>
          </div>
        </div>
      </div>

      <form
        method="POST"
        className=" user_form row  g-3 mt-5 mx-auto mb-3 container needs-validation"
        noValidate
      >
        <div className="col-md-4 mx-auto gx-4 col-8">
          <input
            type="text"
            className="form-control text-center "
            id="validationCustom01"
            name="name"
            onChange={handleInputs}
            value={userData.name}
            placeholder="Your Name"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4 gx-4 mx-auto col-8">
          <input
            type="text"
            className="form-control text-center"
            id="validationCustom02"
            name="phone"
            onChange={handleInputs}
            value={userData.phone}
            placeholder="Your Phone"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>
        <div className="col-md-4 mx-auto gx-4 col-8">
          <input
            type="text"
            className="form-control text-center"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            name="email"
            onChange={handleInputs}
            value={userData.email}
            placeholder="Your Email"
            required
          />
          <div className="invalid-feedback">Please choose a username.</div>
        </div>
        <div className="form-group col-md-12 mx-auto  col-8">
          <textarea
            name="message"
            onChange={handleInputs}
            value={userData.message}
            placeholder="Message"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          />
        </div>
        <div className="col-12 mb-4">
          <button
            onClick={handleContactForm}
            className="btn btn-primary mx-auto"
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </>
  );
};

export default Contact;
