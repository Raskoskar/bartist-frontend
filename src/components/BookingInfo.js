import styles from "../styles/BookingInfo.module.css";
import PropTypes from 'prop-types';
import Image from "next/image";
export const BookingInfo = ({ isOpen, onClose, booking, event, venue }) => {
  if (!isOpen) return null; // Ne rien rendre si la modal n'est pas ouverte

  const handleClose = () => {
    onClose(); // Gestion de la fermeture de la modal
  };

  const handleWrapper = (event) => {
    event.stopPropagation(); // Empêcher la propagation des clics à l'intérieur de la modal
  };


  const formattedDate = new Date(event?.date).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "long", year: "numeric"
  });

  return (
    <div onClick={handleClose} className={styles.container}>
      <div onClick={handleWrapper} className={styles.wrapper}>
        <div className={styles.content}>
          <Image 
                    alt="profil image"
                    className={styles.logo}
                    src= {event.picture}
                    width={350}
                    height={350}/>
          <div className={styles.eventInfo}>
            <div className={styles.infoLeft}>
              <span className={styles.title}>{event.title}</span>
              {event.genres && event.genres.map((genre) => (
                <span key={genre} className={styles.genre}>{genre}</span> // Afficher chaque genre de l'événement
              ))}
            </div>
            <div className={styles.date}>{formattedDate}</div> 
          </div>
          <div className={styles.addressContainer}>
            <span className={styles.exp}>Établissement :</span>
            <span className={styles.venue}>{venue.name.toUpperCase()}</span>
            <span className={styles.address}>{venue.address}</span>
          </div>
          <div className={styles.partContainer}>
            <span className={styles.exp}>Description de la proposition :</span>
            <span>{booking.description}</span>
            <span className={styles.exp}>Heure d'arrivée :</span>
            <span>{booking.hour_start}</span>
            <span className={styles.exp}>Nombre d'heures payées :</span>
            <span>{booking.duration} heures</span>
            <span className={styles.exp}>Tarif :</span>
            <span>{booking.rate / booking.duration}€/heure</span>
            <span className={styles.exp}>Statut de la proposition :</span>
            <span>{booking.status}</span>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button>Contacter</button> 
        </div>
      </div>
    </div>
  );
};

