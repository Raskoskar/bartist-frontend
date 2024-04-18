import styles from "@/styles/ArtistInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faDeezer, faSoundcloud, faSpotify, faFacebook } from "@fortawesome/free-brands-svg-icons";

export const ArtistInfo = ({ isOpen, onClose, artist }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleWrapper = (event) => {
    event.stopPropagation();
  };

  const handleLinks = (event, link) => {
    event.stopPropagation();
    window.open(link, "_blank");
  };

  return (
    <div onClick={handleClose} className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div onClick={handleWrapper} className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
        <div className={styles.imgContainer}></div>
        <div className={styles.title}>
          <h3>{artist.name}</h3>
          <h4>Genres</h4>
        </div>
        <div className={styles.description}>
          <h4>Description :</h4>
          <p>{artist.description}</p>
        </div>
        <div className={styles.links}>
          <h4>Socials :</h4>
          <div className={styles.linksContainer}>
            <button onClick={(e) => handleLinks(e, artist.socials.youtube)} className={`${styles.youtube} ${styles.linksButton}`}>
              <FontAwesomeIcon icon={faYoutube} />
            </button>
            <button onClick={(e) => handleLinks(e, artist.socials.deezer)} className={`${styles.deezer} ${styles.linksButton}`}>
              <FontAwesomeIcon icon={faDeezer} />
            </button>
            <button onClick={(e) => handleLinks(e, artist.socials.soundcloud)} className={`${styles.soundcloud} ${styles.linksButton}`}>
              <FontAwesomeIcon icon={faSoundcloud} />
            </button>
            <button onClick={(e) => handleLinks(e, artist.socials.spotify)} className={`${styles.linksButton} ${styles.spotify}`}>
              <FontAwesomeIcon icon={faSpotify} />
            </button>
            <button onClick={(e) => handleLinks(e, artist.socials.facebook)} className={`${styles.linksButton} ${styles.facebook}`}>
              <FontAwesomeIcon icon={faFacebook} />
            </button>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.contact}>Contacter</button>
          <button className={styles.book}>Booker</button>
        </div>
      </div>
    </div>
  );
};
