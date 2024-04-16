import React, { useState, useSelector } from "react";
import styles from "../styles/SignUp.module.css";
import { useDispatch } from "react-redux";
import { signInArtist } from "@/api/artists";
import { artistLogIn } from "../reducers/artist";
import { venueLogIn } from "@/reducers/venue";
import { signInVenue, signUpVenue } from "@/api/venues";


const SignIn = ({ isOpen, onClose}) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    const data = await signInArtist(signInEmail, signInPassword);
    const data1 = await signInVenue(signInEmail, signInPassword);
    console.log(data)
    if (data.result) {
      dispatch(
        artistLogIn({
          username: signInEmail,
          token: data.token,
          isConnected: true,
        })
      );
      setSignInEmail("");
      setSignInPassword("");
    } else if (data1.result) {
        console.log(data1);
    } else if (data1.result) {
        console.log(data1);
      dispatch(
        venueLogIn({
          username: signInEmail,
          token: data.token,
          isConnected: true,
        })
      );
      setSignInEmail("");
      setSignInPassword("");
    }else
    {
      document.querySelector(
        "#alert"
      ).innerHTML = `Login failed : ${data.error}`;
    }
  };

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
        <h3>Log in into your account</h3>
        <div className={styles.signUp}>
          <input
            className={styles.input}
            type="text"
            name="email"
            placeholder="email..."
            onChange={(e) => setSignInEmail(e.target.value)}
            value={signInEmail}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="password..."
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />
        </div>
        <div id="alert"></div>
        <button
          className={styles.buttonMain}
          id="Sign In"
          onClick={() => handleSignIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
