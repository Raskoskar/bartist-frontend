import styles from "../styles/EventCardList.module.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { EventInfo } from "./EventInfo";
import { getVenueById } from "@/api/venues";
import CreateBookingProposal from "./CreateBookingProposal";
import formatDate from "@/utils/dateFormater";

function EventCardList({ event }) {
  const [venue, setVenue] = useState({}); // Utilisation d'un objet pour initialiser 'venue'
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    getVenueById(event.venue)
      .then((data) => {
        if (data && data.venue) {
          setVenue(data.venue);
        } else {
          console.error("No events found or error:", data.message);
          setVenue({});
        }
      })
      .catch((error) => {
        console.error("Error fetching venue: ", error);
      });
  }, [event.venue]); // Ajout de event.venue comme dépendance

  // Gestion généralisée de l'ouverture des modales
  const toggleModal = (modalSetter, event) => {
    modalSetter(true);
    event.stopPropagation();
  };

  // Fermeture des modales
  const closeModal = (modalSetter) => {
    modalSetter(false);
  };

  const date = formatDate(event.date);

  return (
    <>
      <div className={styles.card} onClick={(e) => toggleModal(setIsEventModalOpen, e)}>
        <div className={styles.leftContent}>
          <div className={styles.dateContainer}>
            <span className={styles.day}>{date.day}</span>
            <span className={styles.month}>{date.month}</span>
            <span className={styles.year}>{date.year}</span>
          </div>
          <div className={styles.imgContainer}>
            {event.picture && (
              <Image src={event.picture} alt={event.title} width={50} height={50} className={styles.img}/>
            )}
          </div>
          <div className={styles.infos}>
            <span className={styles.title}>{event.title}</span>
            <span className={styles.venue}>{venue.name}</span>
          </div>
          <div className={styles.genres}>
            {event.genres?.map((genre) => (
              <div key={genre} className={styles.genre}>
                <p>{genre}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          {/*<button className={styles.contact} disabled={true}>Contacter</button>*/}
          <button className={styles.book} onClick={(e) => toggleModal(setIsBookingModalOpen, e)}>Se proposer</button>
        </div>
      </div>
      <EventInfo
        isOpen={isEventModalOpen}
        onClose={() => closeModal(setIsEventModalOpen)}
        event={event}
        venue={venue}
      />
      <CreateBookingProposal
        isOpen={isBookingModalOpen}
        onClose={() => closeModal(setIsBookingModalOpen)}
        event={event}
      />
    </>
  );
}

export default EventCardList;
