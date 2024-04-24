import Head from "next/head";
import styles from "../styles/Login.module.css";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { useState } from "react";

export default function Login() {
  // État pour contrôler la visibilité du modal de sign up et de sign in
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [userType, setUserType] = useState("");

  // Fonction pour ouvrir les modals
  const openSignUpModal =  (type) => {
    setUserType(type);
    setIsSignUpModalOpen(true);
  };

  

  // Fonction pour fermer le modal
  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };
  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  return (
    <>
      <Head>
        <title>Trouvez votre évènement</title>
        <meta name="description" content="Hey" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <button onClick={openSignInModal}>Se connecter</button>
        </div>
        <div className={styles.title}>
          <h2>
            Êtes-vous le maestro de la mélodie ou la scène qui attend son
            spectacle ?
          </h2>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Artiste</h2>
            <div className={styles.cardElem}>
              <h3>Calendrier Artistique </h3>
              <p>
                Notre calendrier dynamique vous permet de suivre facilement
                votre tournée d'événements et de vous préparer pour chaque
                ovation.
              </p>
            </div>
            <div className={styles.cardElem}>
              <h3>Scènes Ouvertes à Votre Talent</h3>
              <p>
                Feuilletez les opportunités, présentez votre art et prenez
                l'initiative !
              </p>
            </div>
            <div className={styles.cardElem}>
              <h3>Conversations Harmonieuses</h3>
              <p>
                Notre plateforme facilite le dialogue direct avec les
                établissements, vous permettant de peaufiner les détails et
                d'assurer que chaque performance soit une réussite.
              </p>
            </div>

            <button onClick={() => openSignUpModal("artist")}>
              S'inscrire en tant qu'artiste
            </button>
          </div>
          <div className={styles.card}>
            <h2>Etablissement</h2>
            <div className={styles.cardElem}>
              <h3>Orchestrer la magie </h3>
              <p>
                Créez l'événement qui vous ressemble et attirez l'élite
                artistique. Lancez-vous, notre communauté d'artistes passionnés
                n'attend que votre feu vert pour briller.
              </p>
            </div>
            <div className={styles.cardElem}>
              <h3>La Rencontre Parfaite</h3>
              <p>
                Explorez, découvrez et sélectionnez votre coup de cœur parmi une
                mosaïque de talents confirmés.
              </p>
            </div>
            <div className={styles.cardElem}>
              <h3>Dialogue Créatif</h3>
              <p>
                Grace a notre messagerie fluide et intuitive discutez, négociez
                et fixez les détails d'un partenariat harmonieux directement en
                ligne.
              </p>
            </div>
            <button onClick={() => openSignUpModal("venue")}>
              S'inscrire en tant qu'établissement
            </button>
          </div>
        </div>
        <SignUp
          wichUser={userType}
          isOpen={isSignUpModalOpen}
          onClose={closeSignUpModal}
        />
        <SignIn
          isOpen={isSignInModalOpen}
          onClose={closeSignInModal}
        />
      </main>
    </>
  );
}
