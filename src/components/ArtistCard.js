import styles from "../styles/ArtistCard.module.css";
import Image from "next/image";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { ArtistInfo } from "./ArtistInfo";
import CreateBookingProposal from "./CreateBookingProposal";

function ArtistCard({ artist }) {
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Gère l'ouverture des modals
  const handleOpenModal = (type) => {
    if (type === 'artist') {
      setIsArtistModalOpen(true);
    } else {
      setIsBookingModalOpen(true);
    }
  };

  // Gère la fermeture des modals
  const handleCloseModal = (type) => {
    if (type === 'artist') {
      setIsArtistModalOpen(false);
    } else {
      setIsBookingModalOpen(false);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.card} onClick={() => handleOpenModal('artist')}>
        <div className={styles.leftContent}>
          <div className={styles.imgContainer}>
            {artist.image && <Image src={artist.image} alt={artist.name} layout="fill" objectFit="cover" />}
          </div>
          <div className={styles.infos}>
            <h3>{artist.name}</h3>
            <h4>{artist.type}</h4>
          </div>
          <div className={styles.genres}>
            {artist.genres.map(genre => (
              <div key={genre} className={styles.genre}><p>{genre}</p></div>
            ))}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.contact}>Contacter</button>
          <button className={styles.book} onClick={(e) => {
            e.stopPropagation();
            handleOpenModal('booking');
          }}>Booker</button>
        </div>
      </div>
      <ArtistInfo isOpen={isArtistModalOpen} onClose={() => handleCloseModal('artist')} artist={artist} />
      <CreateBookingProposal artist={artist} isOpen={isBookingModalOpen} onClose={() => handleCloseModal('booking')}/>
    </React.Fragment>
  );
}

ArtistCard.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistCard;
