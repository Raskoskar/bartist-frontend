import styles from "@/styles/BookingProposal.module.css";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

import { createBooking } from "../api/bookings";
import { getEventsByVenueToken } from "../api/events" // api pour récupérer les events du venue
import { customStyles } from "@/styles/CustomSlect";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'; // Pour saisir une heure de début sur une horloge
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput'; // Pour saisir un nombre d'heures
import { getVenueByToken } from "@/api/venues";
import { getArtist } from "@/api/artists";
import { useRouter } from "next/navigation";



// transformer en modal lié au  bouton booker pour récupérer les infos
const CreateBookingProposal = ({ isOpen, onClose, artist, event }) => {
  const router = useRouter();
  const [hour_start, setHour_start] = useState(null);
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const user = useSelector((state) => state.user.value);
  const [events, setEvents] = useState([]);
  const [eventBooking, setEventBooking] = useState(null);
  const [artistBook, setArtistBook] = useState("") 

  useEffect(() => {
    if (user.isVenue) {
      getVenueByToken(user.token).then(data => {
        getEventsByVenueToken(user.token).then(data => setEvents(data.events));
      }).catch(error => console.error("Erreur lors de la récupération des événements:", error));
    } else {
      getArtist(user.token).then(data => setArtistBook(data));
    }
  }, [user]);

  const eventsOptions = events.map(event => ({
    label: `${event.title} ${new Date(event.date).toLocaleDateString("fr-FR")}`,
    value: event._id
  }));

  const handleSubmit = async () => {
    if (!hour_start || !duration || !rate || !description || (user.isVenue && !eventBooking)) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    try {
      await createBooking({
        token: user.token,
        isVenue: user.isVenue,
        artistId: artist._id,
        venueId: user.venueId,
        eventId: eventBooking,
        hour_start,
        duration: Number(duration),
        rate: Number(rate),
        status: 'Pending',
        description
      });
      router.push("/propositions");
    } catch (error) {
      console.error("Erreur lors de la création de la réservation:", error);
      alert('Erreur lors de la soumission de la proposition.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <h3>Envoyer une proposition de booking</h3>
        {user.isVenue && (
          <Select
            placeholder="Choisissez un événement"
            styles={customStyles}
            options={eventsOptions}
            onChange={(selectedOption) => setEventBooking(selectedOption.value)}
            value={eventsOptions.find(option => option.value === eventBooking)}
          />
        )}
        <MobileTimePicker
          value={hour_start}
          onChange={setHour_start}
          minutesStep={15}
        />
        <NumberInput
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min={1}
          max={12}
          step={0.5}
        />
        <input
          type="text"
          placeholder="Description de la proposition..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          type="number"
          placeholder="Tarif proposé (€)"
          onChange={(e) => setRate(e.target.value)}
          value={rate}
        />
        <button onClick={handleSubmit}>Envoyer la proposition</button>
        </div>
      </div>
    );
  };
  
  export default CreateBookingProposal;
  
