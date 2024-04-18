import styles from "../styles/EventInfo.module.css";

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

  // ?? A DEPLACER DANS UN FICHIER UTILS/DATE ??
  const date = new Date(event.date);
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
          <span className={styles.exp}>Description de l'évènement :</span>
          <span>{event.description}</span>
        </div>
        <div className={styles.btnContainer}>
          <button>Contacter</button>
          <button>Se proposer</button>
        </div>
      </div>
    </div>
  );
};
