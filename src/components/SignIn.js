import React, { useState } from "react";
import styles from "../styles/SignUp.module.css";
import { useDispatch } from "react-redux";
import { signInArtist } from "@/api/artists";
import { signInVenue } from "@/api/venues";
import { logIn } from "../reducers/user";
import { useRouter } from "next/router";

const SignIn = ({ isOpen, onClose }) => {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState("");
  const [accountType, setAccountType] = useState("artist");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!signInEmail || !signInPassword) {
      setError("Veuillez remplir tout les champs.");
      return;
    }

    setLoading(true);
    try {
      const data = accountType === "artist"
        ? await signInArtist(signInEmail, signInPassword)
        : await signInVenue(signInEmail, signInPassword);

      if (data && data.result) {
        dispatch(logIn({
          pseudo: signInEmail,
          token: data.token,
          isConnected: true,
          isVenue: accountType === "venue",
        }));
        router.push("/Search");
      } else {
        setError(`Login failed: ${data ? data.error : "Erreur inconnue"}`);
      }
    } catch (error) {
      setError(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
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
        <h3>Connectez-vous à votre profil</h3>
        <div className={styles.selectContainer}>
        <label>Je suis :</label>
        <select className={styles.select}
          aria-label="Choisissez votre type de profil"
          onChange={(e) => setAccountType(e.target.value)}
          value={accountType}
        >
          <option value="artist">Artiste</option>
          <option value="venue">Etablissement</option>
        </select>
        </div>
        
        <div className={styles.signUp}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Entrez votre adresse Email..."
            onChange={(e) => setSignInEmail(e.target.value)}
            value={signInEmail}
            aria-label="Email Address"
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe..."
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
            aria-label="Password"
          />
        </div>
        {error && <div className={styles.alert}>{error}</div>}
        <button
          className={styles.buttonMain}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? 'Se connecter...' : 'Se connecter'}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
