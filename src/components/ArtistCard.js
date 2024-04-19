import styles from "../styles/ArtistCard.module.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import React, { useState } from "react";
import { ArtistInfo } from "./ArtistInfo";

function ArtistCard({artist}) {
  // État pour contrôler la visibilité du modal de sign up et de sign in
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);

  // Fonction pour ouvrir les modals
  const openArtistModal = (type) => {
    setIsArtistModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeArtistModal = () => {
    setIsArtistModalOpen(false);
  };

  return (
    <>
      <div className={styles.card} onClick={() => openArtistModal()}>
        <div className={styles.leftContent}>
          <div className={styles.imgContainer}></div>
          <div className={styles.infos}>
            <h3>{artist.name}</h3>
            <h4>{artist.type}</h4>
          </div>
          <div className={styles.genres}>{artist.genres.map(genre => {
            return (
            <div key={genre} className={styles.genre}><p>{genre}</p></div>)
          })}</div>
        </div>
        <div className={styles.dispos}>?</div>
        <div className={styles.buttonContainer}>
          <button className={styles.contact}>Contacter</button>
          <button className={styles.book}>Booker</button>
        </div>
      </div>
      <ArtistInfo isOpen={isArtistModalOpen} onClose={closeArtistModal} artist={artist} />
    </>
  );
}

export default ArtistCard;
