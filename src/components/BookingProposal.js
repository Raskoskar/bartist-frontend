import { RSC_MOD_REF_PROXY_ALIAS } from "next/dist/lib/constants";
import React, { useState } from "react";

/* Je suis un artiste, je clique sur un événement 
je trouve :
- événement pré-rempli
- venue pré-rempli
- artiste pré-rempli
- date pré-remplie
- heure de début
- duration
- description
- tarif
Boutons annuler // envoyer la proposition


Je suis un établissment, je clique sur un artiste
je trouve : 
- événement à choisir dans une liste déroulante
- venue pré-rempli
- artiste pré-rempli
- date pré-remplie - après le choix de l'événement
- heure de début
- duration
- description
- tarif

Boutons annuler // envoyer la proposition
*/



const SignIn = ({ isOpen, onClose}) => {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const router = useRouter()
    const dispatch = useDispatch();
  
    const handleSignIn = async () => {
      const data = await signInArtist(signInEmail, signInPassword);
      const data1 = await signInVenue(signInEmail, signInPassword);
      console.log(data)
      if (data.result) {
        dispatch(
          logIn({
            pseudo: signInEmail,
            token: data.token,
            isConnected: true,
            isVenue: false,
          })
        );
        setSignInEmail("");
        setSignInPassword("");
        router.push("/Search")
  
      } else if (data1.result) {
          console.log(data1);
        dispatch(
          logIn({
            pseudo: signInEmail,
            token: data.token,
            isConnected: true,
            isVenue: true,
          })
        );
        setSignInEmail("");
        setSignInPassword("");
        router.push("/Search");
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
              placeholder="mot de passe..."
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
  