import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import userStore from "../store/UserStore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const user = { email, password };
      const existingUser = await userStore.checkExistingUser(user);
      if (existingUser) {
        navigate("/map");
      } else {
        setIsInvalid(true);
        console.log("ceva invalid");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const onClickRegisterHandler = () => {
    navigate("/register");
  };
  return (
    <div
      className='Login'
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "0",
        top: "0",
        fontFamily: "JetBrains Mono",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "white",
          width: "400px",
          height: "600px",
          borderRadius: "20px",
          left: "0",
          top: "0",
          backgroundColor: "#F0C7FF",
        }}>
        <div style={{ fontSize: "30px", paddingBottom: "80px" }}>
          Welcome back
        </div>
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "10px",
              padding: "10px",
            }}>
            <label
              htmlFor='email'
              style={{
                paddingLeft: "12px",
              }}>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type='email'
              placeholder='Enter your email'
              style={{
                border: "2px solid #A273B3",
                padding: "8px",
                margin: "8px",
                borderRadius: "7px",
                padding: "10px",
              }}
            />
            <label
              htmlFor='password'
              style={{
                paddingLeft: "12px",
                paddingTop: "8px",
              }}>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type='password'
              placeholder='Enter your password'
              style={{
                border: "2px solid #A273B3",
                padding: "8px",
                margin: "8px",
                borderRadius: "7px",
                padding: "10px",
              }}
            />
            {isInvalid && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "red",
                  paddingBottom: "10px",
                }}>
                Invalid email or password
              </div>
            )}
            <div style={{ paddingLeft: "10px" }}>Forgot password?</div>
            <button
              style={{
                backgroundColor: "#A273B3",
                padding: "10px 16px",
                margin: "10px",
                fontSize: "16px",
                borderRadius: "6px",
                border: "0",
                boxSizing: "border-box",
                cursor: "pointer",
                fontFamily: "JetBrains Mono",
                color: "white",
              }}
              type='submit'>
              Login
            </button>
          </div>
        </form>
        <div>Don't have an account?</div>
        <button
          style={{
            backgroundColor: "#A273B3",
            padding: "10px 16px",
            margin: "4px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "0",
            boxSizing: "border-box",
            cursor: "pointer",
            fontFamily: "JetBrains Mono",
            color: "white",
          }}
          onClick={onClickRegisterHandler}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
