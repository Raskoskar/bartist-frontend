import styles from "../styles/CardBooking.module.css";
import Image from "next/image";
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
export default function CardBooking({ booking, isReceived }) {
  //État local pour stocker les événements récupérés depuis l'api bookings
  const [artistBook, setArtistBook] = useState(null);
  const [venueBook, setVenueBook] = useState(null);
  const [eventBook, setEventBook] = useState(null);
  useEffect(() => {
    getArtistById(booking.artist).then((dataA) => {
      setArtistBook(dataA);
    });
    getVenueById(booking.venue).then((dataV) => {
      setVenueBook(dataV);
    });
    getEventById(booking.event).then((dataE) => {
      setEventBook(dataE);
    });
  }, []);

  const handleConfirmBooking = () => {
    const status = "Confirmed";
    props.updateBookingStatus(status);
  };

  const handleRefuseBooking = () => {
    const status = "Refused";
    props.updateBookingStatus(status);
  };

  const buttons = (
    <div className={styles.btnContainer}>
      <FontAwesomeIcon
        onClick={() => handleConfirmBooking()}
        icon={faCheck}
        className={styles.btnAccept}
      />
      <FontAwesomeIcon
        onClick={() => handleRefuseBooking()}
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
  return (
    <div className={styles.card}>
      <div className={styles.leftContent}>
        <div className={styles.dateContainer}>
          <span className={styles.day}>{/*day*/}19</span>
          <span className={styles.month}>{/*month*/}avril</span>
          <span className={styles.year}>{year}2024</span>
        </div>
        <div className={styles.imgContainer}></div>
        <div className={styles.infos}>
          <span className={styles.title}>{eventBook?.title}Event Title</span>
          <div className={styles.genres}>
            {/*eventBook?.genres?.map((genre) => {
              return (
                <div key={genre} className={styles.genre}>
                  <p>{genre}</p>
                </div>
              );
            })*/}
            RAP
          </div>
        </div>
      </div>
      <div className={styles.venueInfosContainer}>
            <span>Venue Name</span>
            <span>Venue Address</span>
      </div>
      <div className={styles.hoursContainer}>
        <span>19h00</span>
        <span>4H</span>
      </div>
      <div className={styles.tarifContainer}>190€/h</div>
      {(booking.status === "Pending" && isReceived == true) && buttons}
      {(booking.status === "Confirmed" || booking.status === "Refused") && (
        <span>{booking.status}</span>
      )}
    </div>
  );
}
