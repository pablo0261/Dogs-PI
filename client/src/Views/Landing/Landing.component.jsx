import React from "react";
import "./Landing.style.css";
import { useHistory } from "react-router-dom";




function Landing() {
  const history = useHistory();

  const handleButtonGo = () => {
    history.push("/Home");
  }

  return (
    <div className="Landing">
      <h1 className="Landing-H1">Welcome to the world of dog breeds</h1>
      
      <button className="LandingButton" onClick={handleButtonGo}>Let's go</button>

    </div>
  );
}

export default Landing;
