import styles from "@/styles/BookingProposal.module.css";

import React, { useState } from "react";
import { useSelector } from "react-redux";

import { createBooking } from "../api/bookings";
// api pour récupérer les events du venue

import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'; // Pour saisir une heure de début sur une horloge
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput'; // Pour saisir un nombre d'heures


/* Je suis un artiste, je clique sur un événement 
je trouve :
- événement pré-rempli
- venue pré-rempli
- artiste pré-rempli
- date pré-remplie
- heure de début //OK 
- duration //OK 
- description //OK 
- tarif //OK 

Boutons annuler // envoyer la proposition


Je suis un établissment, je clique sur un artiste
je trouve : 
- événement à choisir dans une liste déroulante qui affihce  la date 
- date pré-remplie - après choix de l'événement
- venue pré-rempli
- artiste pré-rempli

- heure de début //OK 
- duration //OK 
- description //OK 
- tarif //OK 

Boutons annuler // envoyer la proposition
*/



const BookingProposal = () => {
    const [hour_start, setHour_start] = useState();
    const [duration, setDuration] = useState();
    const [description, setDescription] = useState("");
    const [rate, setRate] = useState();
    const user = useSelector((state) => state.user.value);

    if(user.isVenue) {
// - événement à choisir dans une liste déroulante qui affiche  la date 
// - date pré-remplie - après choix de l'événement
// - venue pré-rempli
// - artiste pré-rempli
    } else {
      // - événement pré-rempli
      // - venue pré-rempli
      // - artiste pré-rempli
      // - date pré-remplie
    }
  
    const handleSubmit = async () => {
      const status = 'Pending';
      createBooking(user.isVenue, user.token, eventId, tokenOtherUser, date, description, status, duration, hour_start, rate)
    }
    
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>

          <h3>Envoyer une proposition de booking</h3>
          <div className={styles.formElem}>
            <label>
              Heure de début de l'événement <span>*</span>
            </label>
            <MobileTimePicker
              onChange={(e) => setHour_start(e)}
              value={hour_start}
              minutesStep={15}
            />
          </div>
          <div className={styles.formElem}>
            <label>
              Durée de la prestation <span>*</span>
            </label>
            <NumberInput
              placeholder="Entrer un nombre…"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min={1}
              max={12}
              step={0.5}
            />
          </div>
          <div className={styles.formElem}>
            <label>
              Description <span>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              name="description"
              placeholder="Description de la proposition..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className={styles.formElem}>
            <label>
              Tarif proposé (€) <span>*</span>
            </label>
            <input
              className={styles.input}
              type="number"
              name="rate"
              placeholder="Tarif que vous proposez pour la prestation (€)"
              onChange={(e) => setRate(e.target.value)}
              value={rate}
              step={5}
            />
          </div>
          <div id="alert"></div>
          <button
            className={styles.buttonMain}
            id="Send booking proposal"
            onClick={() => handleSubmit()}
          >
            Envoyer la proposition
          </button>
        </div>
      </div>
    );
  };
  
  export default BookingProposal;
  
