import React, { useState, useSelector } from "react";
import styles from "../styles/SignUp.module.css";
import { useDispatch } from "react-redux";
import { signUpArsist } from "@/api/artists";
import { login } from "../reducers/user";
const SignUp = ({ isOpen, onClose, wichUser }) => {
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  
  const dispatch = useDispatch()


  const handleRegister = () => {
    const data = signUpArsist()
        if (data.result) {
          console.log(data)
          dispatch(login({ username: signUpUsername, token: data.token, isConnected: true }));
          setSignUpFirstname("");
          setSignUpUsername("");
          setSignUpPassword("");
        }else{
          document.querySelector('#alert').innerHTML =  `Login failed : ${data.error}`;
        }
    }
  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button
          className={styles.cross}
          onClick={onClose}
          style={{ position: "absolute", top: 0, right: 0, cursor: "pointer" }}
        >
          ×
        </button>
        <h3>Create your {wichUser} account</h3>
        <div className={styles.signUp}>
          <input
            className={styles.input}
            type="text"
            name="firstname"
            placeholder="firstname..."
            onChange={(e) => setSignUpFirstname(e.target.value)} 
            value={signUpFirstname}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="password..."
            onChange={(e) => setSignUpPassword(e.target.value)} 
            value={signUpPassword}
          />
        </div>
        <div id='alert'></div>
        <button className={styles.buttonMain} id="register" onClick={() => handleRegister()}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
