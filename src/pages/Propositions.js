import Layout from "@/components/Layout";
import styles from "@/styles/Propositions.module.css";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CardBooking from "@/components/cardBooking";
import CreateBookingProposal from "@/components/CreateBookingProposal";
import { displayBookings } from "../api/bookings";

// Composant principal pour la gestion des propositions de réservation
export default function Propositions() {
  // Utilisation du Redux store pour récupérer les informations de l'utilisateur
  const user = useSelector((state) => state.user.value);
  const [bookings, setBookings] = useState([]); // État pour les réservations
  const [loading, setLoading] = useState(false); // État pour le chargement
  const [error, setError] = useState(""); // État pour les erreurs

  // Effectue un appel API pour charger les réservations à la création du composant
  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        const data = await displayBookings(user.token, user.isVenue);
        setBookings(data.dataBookings);
      } catch (err) {
        setError("Échec de la récupération des réservations. Veuillez réessayer plus tard.");
        console.error(err); // Affiche l'erreur dans la console
      }
      setLoading(false);
    }
    fetchBookings();
  }, [user.token, user.isVenue]);

  // Filtre les réservations reçues ou envoyées en fonction du type d'utilisateur
  const getBookings = (isReceived) => {
    if (user.isVenue) {
    return bookings.filter(booking => (!booking.creatorIsVenue) === isReceived);
  }else{
    return bookings.filter(booking => (booking.creatorIsVenue) === isReceived);
  }
}

  return (
    <Layout>
      <div className={styles.main}>
        {error && <p>{error}</p>}
        {loading ? <p>Chargement...</p> : (
          <>
            <div className={styles.titleContainer}>
              <span className={styles.title}>Propositions</span>
            </div>
            <CreateBookingProposal />
            <BookingList title="Bookings Reçues" bookings={getBookings(true)} isReceived={true} />
            <BookingList title="Bookings Envoyées" bookings={getBookings(false)} isReceived={false} />
          </>
        )}
      </div>
    </Layout>
  );
}

// Composant pour afficher la liste des réservations
function BookingList({ title, bookings, isReceived }) {
  return (
    <div className={styles.bookingList}>
      <div className={styles.bookingsTitleContainer}>
        <span className={styles.bookingTitle}>{title}</span>
      </div>
      {bookings.map((booking) => (
        <CardBooking
          key={booking.id}
          booking={booking}
          isReceived={isReceived}
        />
      ))}
    </div>
  );
}
