import styles from "../styles/BookingInfo.module.css";

export const BookingInfo = ({ isOpen, onClose, booking, event, venue }) => {
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

   // Découpage de la date de l'événement
  // ?? A DEPLACER DANS UN FICHIER UTILS/DATE ??
  const date = new Date(event?.date);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    day: "2-digit", // numeric, 2-digit
    month: "long", // numeric, 2-digit, long, short, narrow
    year: "numeric", // numeric, 2-digit
  });

  const parts = formattedDate.split(" ");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  // ----------------------------------------- //

  return (
    <div onClick={handleClose} className={styles.container}>
      <div onClick={handleWrapper} className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.imgContainer}></div>
          <div className={styles.eventInfo}>
            <div className={styles.infoLeft}>
              <span className={styles.title}>{event.title}</span>
              <div className={styles.genres}>
                {event.genres.map((genre) => {
                  return (
                    <span key={genre} className={styles.genre}>
                      {genre}
                    </span>
                  );
                })}
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
            <span className={styles.exp}>Etablissement :</span>
            <span className={styles.venue}>{venue.name.toUpperCase()}</span>
            <span className={styles.address}>{venue.address}</span>
          </div>
          <hr />
          <span className={styles.exp}>Description de la proposition</span>
          <span>{booking.description}</span>
          <span className={styles.exp}>Heure d'arrivée</span>
          <span>{booking.hour_start}</span>

          <span className={styles.exp}>Nombres d'heures payées</span>
          <span>{booking.duration} heures</span>

          <span className={styles.exp}>Tarif</span>
          <span>{booking.rate / booking.duration}€/heure</span>

          <span className={styles.exp}>Status de la proposition</span>
          <span>{booking.status}</span>

        </div>
        <div className={styles.btnContainer}>
          <button>Contacter</button>
          {booking.status != ("Confirmed" || "Refused") &&
          <button>Se proposer</button>
        }
        </div>
      </div>
    </div>
  );
};
