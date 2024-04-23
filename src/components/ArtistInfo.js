import styles from "@/styles/ArtistInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faDeezer, faSoundcloud, faSpotify, faFacebook } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import PropTypes from 'prop-types';

export const ArtistInfo = ({ isOpen, onClose, artist }) => {
  // Ne rend rien si le modal n'est pas ouvert
  if (!isOpen) return null;

  // Gestionnaire pour ouvrir les liens dans de nouveaux onglets
  const handleLinks = (e, url) => {
    e.stopPropagation();
    if (url) window.open(url, '_blank');
  };

  return (
    <div onClick={onClose} className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div onClick={e => e.stopPropagation()} className={styles.wrapper}>
        <div className={styles.imgContainer}>
          {/* Utilisation du composant Image de Next.js pour afficher l'image de l'artiste */}
          {artist.imageUrl && <Image src={artist.imageUrl} alt={artist.name} layout="fill" objectFit="cover" />}
        </div>
        <div className={styles.title}>
          <h3>{artist.name}</h3>
          
        </div>
        <div className={styles.description}>
        <h4>Genres</h4>
          {/* Affichage des genres de l'artiste */}
          <p>{artist.genres?.join(", ")}</p>
        </div>
        <div className={styles.description}>
          <h4>Description :</h4>
          <p>{artist.description}</p>
        </div>
        <div className={styles.links}>
          <h4>Réseaux sociaux :</h4>
          <div className={styles.linksContainer}>
            {/* Boutons pour les réseaux sociaux, affichés seulement si le lien est disponible */}
            {artist.socials.youtube && (
              <button onClick={(e) => handleLinks(e, artist.socials.youtube)} className={`${styles.youtube} ${styles.linksButton}`}>
                <FontAwesomeIcon icon={faYoutube} />
              </button>
            )}
            {artist.socials.deezer && (
              <button onClick={(e) => handleLinks(e, artist.socials.deezer)} className={`${styles.deezer} ${styles.linksButton}`}>
                <FontAwesomeIcon icon={faDeezer} />
              </button>
            )}
            {artist.socials.soundcloud && (
              <button onClick={(e) => handleLinks(e, artist.socials.soundcloud)} className={`${styles.soundcloud} ${styles.linksButton}`}>
                <FontAwesomeIcon icon={faSoundcloud} />
              </button>
            )}
            {artist.socials.spotify && (
              <button onClick={(e) => handleLinks(e, artist.socials.spotify)} className={`${styles.linksButton} ${styles.spotify}`}>
                <FontAwesomeIcon icon={faSpotify} />
              </button>
            )}
            {artist.socials.facebook && (
              <button onClick={(e) => handleLinks(e, artist.socials.facebook)} className={`${styles.linksButton} ${styles.facebook}`}>
                <FontAwesomeIcon icon={faFacebook} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

