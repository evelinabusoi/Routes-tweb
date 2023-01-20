import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../store/UserStore";

const Register = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/map");
    console.log(email, password);

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    userStore.addUser(user);
    console.log(user);
  };

  const onClickLoginHandler = () => {
    navigate("/");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#A273B3",
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
                borderRadius: "10px",
                padding: "10px",
              }}
              ref={emailRef}
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
                borderRadius: "10px",
                padding: "10px",
              }}
              ref={passwordRef}
            />

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
              Register
            </button>
          </div>
        </form>
        <div>Already have an account?</div>
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
          onClick={onClickLoginHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
