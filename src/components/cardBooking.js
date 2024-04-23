import styles from "../styles/CardBooking.module.css";
import Image from "next/image";
import { BookingInfo } from "./BookingInfo";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { updateBookingStatus } from "@/api/bookings";
import { getArtistById } from "@/api/artists";
import { getVenueById } from "@/api/venues";
import { getEventById } from "@/api/events";
function CardBooking({ booking, isReceived }) {
  // État local pour stocker les informations de réservation
  const [artistBook, setArtistBook] = useState({});
  const [venueBook, setVenueBook] = useState({});
  const [eventBook, setEventBook] = useState({});
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistData = await getArtistById(booking.artist);
        const venueData = await getVenueById(booking.venue);
        const eventData = await getEventById(booking.event);
        setArtistBook(artistData.artist);
        setVenueBook(venueData.venue);
        setEventBook(eventData.event);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, [booking.artist, booking.venue, booking.event]);

  const handleConfirmBooking = (event) => {
    event.stopPropagation();
    updateBookingStatus(booking._id, "Confirmed");
  };

  const handleRefuseBooking = (event) => {
    event.stopPropagation();
    updateBookingStatus(booking._id, "Refused");
  };

  const openEventModal = (event) => {
    event.stopPropagation();
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setIsEventModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  };

  const dateComponents = formatDate(eventBook.date).split(" ");
  const cardClass = styles.card + (booking.status === "Confirmed" ? ` ${styles.accepted}` : booking.status === "Refused" ? ` ${styles.cancel}` : "");

  return (
    <>
      <div className={cardClass} onClick={openEventModal}>
        <div className={styles.leftContent}>
          <div className={styles.dateContainer}>
            <span className={styles.day}>{dateComponents[0]}</span>
            <span className={styles.month}>{dateComponents[1]}</span>
            <span className={styles.year}>{dateComponents[2]}</span>
          </div>
          <div className={styles.infos}>
            <span className={styles.title}>{eventBook.title}</span>
            <div className={styles.genres}>{eventBook.genres?.map((genre) => <div key={genre} className={styles.genre}><p>{genre}</p></div>)}</div>
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
          {booking.rate / booking.duration}€/heure
        </div>
        {booking.status === "Pending" && isReceived && (
          <div className={styles.btnContainer}>
            <FontAwesomeIcon icon={faCheck} onClick={handleConfirmBooking} className={styles.btnAccept} />
            <FontAwesomeIcon icon={faXmark} onClick={handleRefuseBooking} className={styles.btnDecline} />
          </div>
        )}
        {(booking.status === "Confirmed" || booking.status === "Refused" || !isReceived) && <div className={styles.statusContainer}><span>{booking.status}</span></div>}
      </div>
      <BookingInfo isOpen={isEventModalOpen} onClose={closeEventModal} event={eventBook} venue={venueBook} booking={booking} />
    </>
  );
}

export default CardBooking;
