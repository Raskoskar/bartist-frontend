import styles from "../styles/CardBooking.module.css";
import Image from "next/image";
import {BookingInfo} from "./BookingInfo";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faWindowClose,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { updateBookingStatus } from "../api/bookings";
import { getArtistById } from "@/api/artists";
import { getVenueById } from "@/api/venues";
import { getEventById } from "@/api/events";

function CardBooking({ booking, isReceived }) {
  //État local pour stocker les événements récupérés depuis l'api bookings
  const [artistBook, setArtistBook] = useState({});
  const [venueBook, setVenueBook] = useState({});
  const [eventBook, setEventBook] = useState({});
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  useEffect(() => {
    console.log(booking.artist);
    getArtistById(booking.artist).then((dataA) => {
      setArtistBook(dataA.artist);
      console.log(artistBook);
    });
    getVenueById(booking.venue).then((dataV) => {
      setVenueBook(dataV.venue);
      console.log(venueBook);
    });
    getEventById(booking.event).then((dataE) => {
      setEventBook(dataE.event);
      console.log(eventBook);
    });
  }, []);

  const handleConfirmBooking = (event) => {
    const status = "Confirmed";
    updateBookingStatus(booking._id, status);
    event.stopPropagation();
  };

  const handleRefuseBooking = (event) => {
    const status = "Refused";
    updateBookingStatus(booking._id, status);
    event.stopPropagation(e);

  };

  const buttons = (
    <div className={styles.btnContainer}>
      <FontAwesomeIcon
        onClick={(e) => handleConfirmBooking(e)}
        icon={faCheck}
        className={styles.btnAccept}
      />
      <FontAwesomeIcon
        onClick={(e) => handleRefuseBooking(e)}
        icon={faXmark}
        className={styles.btnDecline}
      />
    </div>
  );

  // Découpage de la date de l'événement
  // ?? A DEPLACER DANS UN FICHIER UTILS/DATE ??
  const date = new Date(eventBook?.date);
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


  // Fonction pour ouvrir les modals
  const openEventModal = (event) => {
    setIsEventModalOpen(true);
    event.stopPropagation();

  };

  // Fonction pour fermer le modal
  const closeEventModal = (event) => {
    setIsEventModalOpen(false);
    event.stopPropagation();

  };


  const cardClass = () => {
    let baseClass = styles.card;
    if (booking.status === "Confirmed") {
      return `${baseClass} ${styles.accepted}`;
    } else if (booking.status === "Refused") {
      return `${baseClass} ${styles.cancel}`;
    }
    return baseClass;
  };

  return (
    <>
      <div className={cardClass()} onClick={() => openEventModal()}>
        <div className={styles.leftContent}>
          <div className={styles.dateContainer}>
            <span className={styles.day}>{day}</span>
            <span className={styles.month}>{month}</span>
            <span className={styles.year}>{year}</span>
          </div>
          <div className={styles.infos}>
            <span className={styles.title}>{eventBook.title}</span>
            <div className={styles.genres}>
              {eventBook.genres?.map((genre) => {
                return (
                  <div key={genre} className={styles.genre}>
                    <p>{genre}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.venueInfosContainer}>
          <span>{venueBook.name}</span>
          <span>{venueBook.address}</span>
        </div>
        <div className={styles.hoursContainer}>
          <span>{booking.hour_start}</span>
          <span>{booking.duration} heures</span>
        </div>
        <div className={styles.tarifContainer}>
          {booking.rate / booking.duration}/heure
        </div>

        {booking.status === "Pending" && isReceived == true && buttons}
        {(booking.status === "Confirmed" || booking.status === "Refused" || isReceived == false) && (
          <div className={styles.statusContainer}>
            <span>{booking.status}</span>
          </div>
        )}
      </div>
      <BookingInfo
        isOpen={isEventModalOpen}
        onClose={closeEventModal}
        event={eventBook}
        venue={venueBook}
        booking={booking}
      />
      </>
  );
}

export default CardBooking