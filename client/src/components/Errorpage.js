import React from "react";
import { NavLink } from "react-router-dom";
const Errorpage = () => {
  return (
    <>
      <div className="page_not_found">
        <div className="notFound_div">
          <div className="page_404">
            <h1>404</h1>
          </div>
          <div className="page_info">
            <h2>we are sorry,page not found!</h2>
            <p className="mb-5">
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable
            </p>
            <NavLink className="btn border btn-group" to="/">
              Back to Homepage
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Errorpage;
