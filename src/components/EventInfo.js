import styles from "../styles/EventInfo.module.css";
import formatDate from "@/utils/dateFormater"; 

export const EventInfo = ({ isOpen, onClose, event, venue }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleWrapper = (event) => {
    event.stopPropagation();
  };

  const handleLink = (event, link) => {
    event.stopPropagation();
    window.open(link, "_blank");
  };

  // Utilisation de la fonction formatDate pour obtenir les éléments de la date
  const { day, month, year } = formatDate(event.date);
  
  return (
    <div onClick={handleClose} className={styles.container}>
      <div onClick={handleWrapper} className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            {/* Ajoutez l'image de l'événement si disponible */}
            {event.picture && (
              <img src={event.picture} alt={event.title} className={styles.eventImage} />
            )}
          </div>
          <div className={styles.eventInfo}>
            <div className={styles.infoLeft}>
              <span className={styles.title}>{event.title}</span>
              <div className={styles.genres}>
                {event.genres.map((genre) => (
                  <span key={genre} className={styles.genre}>
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.date}>
              <span className={styles.day}>{day}</span>
              <span className={styles.month}>{month}</span>
              <span className={styles.year}>{year}</span>
            </div>
          </div>
          <hr />
          <div className={styles.addressContainer}>
            <span className={styles.exp}>Établissement :</span>
            <span className={styles.venue}>{venue.name.toUpperCase()}</span>
            <span className={styles.address}>{venue.address}</span>
          </div>
          <hr />
          <div className={styles.partContainer}>
            <span className={styles.exp}>Description de l'événement :</span>
            <span>{event.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
