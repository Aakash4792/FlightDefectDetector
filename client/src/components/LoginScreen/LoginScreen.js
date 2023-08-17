import React from "react";
import "../../App.css";
import GoogleButton from "react-google-button";
import AuthContext from "../../store/auth-context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } =
    useContext(AuthContext);
  //  console.log(loginWithRedirect, logout, user, isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/homepage");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <div className="left-column">
        <h1 className="header">Flight Defect Detector</h1>
      </div>
      <div className="right-column">
        <div className="header">Login</div>
        <div className="empty-div">
          <GoogleButton onClick={loginWithRedirect} />
        </div>
        {/* {isAuthenticated && (
          <div>
            <div>Logged In</div>
            <button onClick={logout}>Logout </button>
            <pre style={{ textAlign: "start" }}>
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LoginScreen;
