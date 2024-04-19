import styles from "../styles/EventCardList.module.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { EventInfo } from "./EventInfo";
import { getVenue } from "@/api/venues";
function EventCardList({ event }) {
  const [venue, setVenue] = useState([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  useEffect(() => {
    try {
      getVenue(event.venue)
        .then((data) => {
          if (data && data.result) {
            setVenue(data.venue);
          } else {
            console.log("No events found or error:", data.message);
            setVenue({});
          }
        })
    } catch (error) {
      console.error("Error useEffect: ", error.message);
    }
  }, []);

  // Fonction pour ouvrir les modals
  const openEventModal = () => {
    setIsEventModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeEventModal = () => {
    setIsEventModalOpen(false);
  };

  // Découpage de la date de l'événement
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
    <>
      <div className={styles.card} onClick={() => openEventModal()}>
        <div className={styles.leftContent}>
          <div className={styles.dateContainer}>
            <span className={styles.day}>{day}</span>
            <span className={styles.month}>{month}</span>
            <span className={styles.year}>{year}</span>
          </div>
          <div className={styles.imgContainer}></div>
          <div className={styles.infos}>
            <span className={styles.title}>{event.title}</span>
            <span className={styles.venue}>{venue.name}</span>
          </div>
          <div className={styles.genres}>
            {event.genres.map((genre) => {
              return (
                <div key={genre} className={styles.genre}>
                  <p>{genre}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.dispos}>?</div>
        <div className={styles.buttonContainer}>
          <button className={styles.contact}>Contacter</button>
          <button className={styles.book}>Se proposer</button>
        </div>
      </div>
      <EventInfo
        isOpen={isEventModalOpen}
        onClose={closeEventModal}
        event={event}
        venue={venue}
      />
    </>
  );
}

export default EventCardList;
