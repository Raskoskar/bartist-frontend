import React, { useState } from "react";
import styles from "../styles/SignUp.module.css";
import { useDispatch } from "react-redux";
import { signUpArtist } from "@/api/artists"; 
import { signUpVenue } from "@/api/venues";
import { logIn } from "../reducers/user";
import { useRouter } from "next/router";

const SignUp = ({ isOpen, onClose, wichUser }) => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State pour savoir si entrain de charger

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async (type) => {
    if (!signUpEmail || !signUpPassword) {
      setError("L'email et le mot de passe sont obligatoire.");
      return;
    }
    setLoading(true);
    try {
      const data = type === "artist"
        ? await signUpArtist(signUpEmail, signUpPassword)
        : await signUpVenue(signUpEmail, signUpPassword);

      if (data.result) {
        dispatch(logIn({
          pseudo: signUpEmail,
          token: data.token,
          isConnected: true,
          isVenue: type === "venue"
        }));
        setSignUpEmail("");
        setSignUpPassword("");
        onClose(); 
        router.push(type === "artist" ? "/ArtistForm" : "/VenueForm");
      } else {
        setError(`Registration failed: ${data.error}`);
      }
    } catch (err) {
      setError(`Registration failed: ${err.message}`);
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
        <h3>Créez votre compte {wichUser == 'artist' ? "artiste" : "établissement"}</h3>
        <div className={styles.signUp}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Entrez votre adresse Email..."
            onChange={(e) => setSignUpEmail(e.target.value)}
            value={signUpEmail}
            aria-label="Email"
            required
  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
  title="Veuillez entrer une adresse email valide. Exemple: exemple@domaine.com"
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe..."
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
            aria-label="Password"
          />
        </div>
        {loading ? <p>Loading...</p> : null}
        {error && <div className={styles.alert}>{error}</div>}
        <button
          className={styles.buttonMain}
          onClick={() => handleRegister(wichUser)}
          disabled={loading} 
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default SignUp;
