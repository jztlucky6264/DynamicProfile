import React, { useEffect, useState } from "react";
import userpic from "../img/userpic.jpg";
import { useHistory } from "react-router-dom";
const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const callaboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserData(data);

      if (!res.ok === 200) {
        const error = new Error(res.error);
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      // history.push("/login");
    }
  };
  useEffect(() => {
    callaboutPage();
  }, []);

  return (
    <>
      <div className="user_profile ">
        <form method="GET" className="container">
          <div className="row profile_name_row w-100 ">
            <div className="col-4 col-md-4 ">
              <div className="img_div">
                <img
                  // style={{ height: "30vh", border: "1px solid blue" }}
                  src="https://images.unsplash.com/photo-1529485726363-95c8d62f656f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                  alt="pic..."
                />
              </div>
            </div>
            <div className="col-6  col-md-6">
              <div className="profile_head d-flex justify-content-start flex-column">
                <div className="text-break w-100">
                  <h2>{userData.name}</h2>
                </div>
                <h4 className=" link-info">{userData.work}</h4>

                <p className="profile_rating mt-3 ">
                  <b> Rankings : </b>
                  <span>1/10</span>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" col-10 w-100">
              <div className="profile-work ">
                <a
                  href="https://github-users-profile.vercel.app/"
                  target="_lucky"
                >
                  Youtuber
                </a>
                <br />
                <a
                  href="https://github-users-profile.vercel.app/"
                  target="_lucky"
                >
                  Web Developer
                </a>
                <br />
                <a
                  href="https://github-users-profile.vercel.app/"
                  target="_lucky"
                >
                  Instagram
                </a>
                <br />
                <a
                  href="https://github-users-profile.vercel.app/"
                  target="_lucky"
                >
                  Facebook
                </a>
                <br />
                <a
                  href="https://github-users-profile.vercel.app/"
                  target="_lucky"
                >
                  Mern Developer
                </a>
                <br />
              </div>
            </div>
          </div>
          <div className="row btn_row">
            <div className="col-8 mb-2 ">
              <input
                type="button"
                name="btnAddMore"
                className="profile-edit-btn w-100"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row tab_row">
            <div className="col-10">
              <ul className="nav nav-tabs" role="tablist">
                <li className=" active">
                  <a
                    className="about_tab active nav-link"
                    data-toggle="tab"
                    href="#home"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" href="#profile" className=" nav-link">
                    Timeline
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row tab_info_row">
            <div className="col-10 pt-1 about_info">
              <div className="tab-content" id="myTabContent">
                <div id="home" className="tab-pane  in active">
                  <div className="row">
                    <div className="col-4 label_div ">
                      <label> User ID</label>
                    </div>
                    <div className="col-4  para_div ">
                      <p>{userData._id}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 label_div">
                      <label> Name</label>
                    </div>
                    <div className="col-4 ">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 label_div">
                      <label>Email</label>
                    </div>
                    <div className="col-4 ">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 label_div">
                      <label>Phone</label>
                    </div>
                    <div className="col-4 ">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 label_div">
                      <label>Profession</label>
                    </div>
                    <div className="col-4 ">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>
                <div id="profile" className="tab-pane fade ">
                  <div className="row">
                    <div className="col-4 label_div">
                      <label> Experince</label>
                    </div>
                    <div className="col-4 ">
                      <p>Five Year</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 label_div">
                      <label> Name</label>
                    </div>
                    <div className="col-4 ">
                      <p>Lucky yadav</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 label_div">
                      <label> Experince</label>
                    </div>
                    <div className="col-4 ">
                      <p>Five Year</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 label_div">
                      <label> Members</label>
                    </div>
                    <div className="col-4 ">
                      <p>Tewenty</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 label_div">
                      <label> company</label>
                    </div>
                    <div className="col-4 ">
                      <p>Xword</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
