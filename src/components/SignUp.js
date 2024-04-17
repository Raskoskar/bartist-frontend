import React, { useState, useSelector } from "react";
import styles from "../styles/SignUp.module.css";
import { useDispatch } from "react-redux";
import { signUpArtist } from "@/api/artists";
import { signUpVenue } from "@/api/venues";
import { logIn } from "../reducers/user";
import { useRouter } from "next/router";
const SignUp = ({ isOpen, onClose, wichUser }) => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter()
  const handleRegister = async (type) => {
    let data = null;
    if (type == "artist") {
      data = await signUpArtist(signUpEmail, signUpPassword);

      if (data.result) {
        dispatch(
          logIn({
            pseudo: signUpEmail,
            token: data.token,
            isConnected: true,
            isVenue: false,
          })
        );
        setSignUpEmail("");
        setSignUpPassword("");
        router.push("/ArtistForm")

      } else {
        document.querySelector(
          "#alert"
        ).innerHTML = `Login failed : ${data.error}`;
      }
    } else {
      data = await signUpVenue(signUpEmail, signUpPassword);
      if (data.result) {
        dispatch(
          logIn({
            pseudo: signUpEmail,
            token: data.token,
            isConnected: true,
            isVenue: true
          })
        );
        setSignUpEmail("");
        setSignUpPassword("");
        router.push("/VenueForm"); // dirige l'user vers la page venueform
      } else {
        document.querySelector(
          "#alert"
        ).innerHTML = `Login failed : ${data.error}`;
      }
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
        <h3>Create your {wichUser} account</h3>
        <div className={styles.signUp}>
          <input
            className={styles.input}
            type="text"
            name="firstname"
            placeholder="firstname..."
            onChange={(e) => setSignUpEmail(e.target.value)}
            value={signUpEmail}
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
        <div id="alert"></div>
        <button
          className={styles.buttonMain}
          id="register"
          onClick={() => handleRegister(wichUser)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
