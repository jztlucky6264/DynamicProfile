import React, { useState, useEffect } from "react";

const Home = () => {
  const [userData, setUserData] = useState("");
  const userHomepage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        name: data.name,
      });

      if (!res.ok === 200) {
        const error = new Error(res.error);
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userHomepage();
  }, []);
  return (
    <>
      <div className="home_main_div">
        <div className="home_page">
          <div className="home_div  ">
            <p className="pt-5 text-center  ">WELCOME</p>
            <h1 className=" text-center ">{userData.name}</h1>
            <h2 className="text-center ">We Are The MERN Developer</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
