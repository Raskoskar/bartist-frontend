import Layout from "@/components/Layout";
import styles from "@/styles/Propositions.module.css";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CardBooking from "@/components/cardBooking";
import { displayBookings } from "../api/bookings";

export default function Propositions() {
  const user = useSelector((state) => state.user.value);
  const [bookings, setBookings] = useState([]);
  const [venueBookings, setVenueBookings] = useState([]);
  const [nonVenueBookings, setNonVenueBookings] = useState([]);

  useEffect(() => {
    displayBookings(user.token, user.isVenue).then((data) => {
      setBookings(data.dataBookings);
      console.log("data", data.dataBookings);
      setVenueBookings(
        data.dataBookings.filter((booking) => booking.creatorIsVenue)
      );
      setNonVenueBookings(
        data.dataBookings.filter((booking) => !booking.creatorIsVenue)
      );
    });
  }, [user.token, user.isVenue]);

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Propositions</span>
        </div>
        <div className={styles.bookings}>
          <div>
            <div className={styles.bookingsTitleContainer}>
              <span className={styles.bookingTitle}>Bookings Reçus</span>
            </div>
            <div className={styles.hints}>
                <div className={styles.hint}>
                  <span>Event</span>
                </div>
                <div className={styles.hint}>
                  <span>Etablissement</span>
                </div>
                <div className={styles.hint}>
                  <span>Heure arrivée <br/>Nombre d'heures</span>
                </div>
                <div className={styles.hint}>
                  <span>Tarif</span>
                </div>
                <div className={styles.hint}>
                  <span> </span>
                </div>
              </div>
            {user.isVenue
              ? nonVenueBookings.map((booking) => (
                  <CardBooking
                    key={booking.id}
                    booking={booking}
                    isReceived={true}
                  />
                ))
              : venueBookings.map((booking) => (
                  <CardBooking
                    key={booking.id}
                    booking={booking}
                    isReceived={true}
                  />
                ))}
          </div>
          <div>
            <div className={styles.bookingsTitleContainer}>
              <span className={styles.bookingTitle}>Bookings Envoyés</span>
            </div>
            {user.isVenue
              ? venueBookings.map((booking) => (
                  <CardBooking
                    key={booking.id}
                    booking={booking}
                    isReceived={false}
                  />
                ))
              : nonVenueBookings.map((booking) => (
                  <CardBooking
                    key={booking.id}
                    booking={booking}
                    isReceived={false}
                  />
                ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
