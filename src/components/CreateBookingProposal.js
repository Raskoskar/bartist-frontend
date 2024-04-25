import styles from "@/styles/BookingProposal.module.css";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

import { createBooking } from "../api/bookings";
import { getEventsByVenueToken } from "../api/events" // api pour récupérer les events du venue
import formatDate from '../utils/dateFormater'

import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'; // Pour saisir une heure de début sur une horloge
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput'; // Pour saisir un nombre d'heures
import { getVenueByToken } from "@/api/venues";
import { getArtist } from "@/api/artists";
import { useRouter } from "next/navigation";



// transformer en modal lié au  bouton booker pour récupérer les infos
const CreateBookingProposal = ({isOpen, onClose, artist, event}) => {
  const router = useRouter()
    const [hour_start, setHour_start] = useState(); // Input hour_start
    const [duration, setDuration] = useState(); // Input duration

    const [description, setDescription] = useState(""); // input desc
    const [rate, setRate] = useState(); //input rate
    const user = useSelector((state) => state.user.value);
    const [venue, setVenue] = useState(""); // Objet venue
    const [events, setEvents] = useState([]) // Liste  des events
    const [eventBooking, setEventBooking] = useState("") // event selectionné pour le booking
    const [artistBook, setArtistBook] = useState("") // artist selectionné pour le booking

    

    useEffect(() => {
      if(user.isVenue){
        getVenueByToken(user.token).then(data => {
          setVenue(data.venue._id)
        })
        getEventsByVenueToken(user.token) // Je récupère les events de l'artiste
          .then((data) => {
          setEvents(data.events)
          
        });
      }else{
        getArtist(user.token).then(data => {
          setArtistBook(data)
        })
      }
      
    }, []);

    const eventsInfos = events.map(eventOne => {
        // Utilisation de la fonction formatDate pour obtenir les éléments de la date
  const { day, month, year } = formatDate(eventOne.date);
      return {label: `${eventOne.title} ${day} ${month} ${year}`, value: eventOne._id }
    })

    const handleEventChange = (selectedOptions) => {
      console.log("current selected type: ", selectedOptions.value);
      setEventBooking(selectedOptions.value);
    };
    const handleWrapper = (event) => {
      event.stopPropagation();
    };
    const handleClose = () => {
      onClose();
    };
    

   
    const handleSubmit = async () => {
      const status = 'En attente';
      if(user.isVenue){
         await createBooking(user.token, user.isVenue, artist._id , venue, eventBooking, hour_start, Number(duration), Number(rate), status, description)
         router.push("/Propositions")
      }else{
        const data = await createBooking(user.token, user.isVenue, artistBook._id , event.venue, event._id, hour_start, Number(duration), Number(rate), status, description)
        console.log(data)
      }
    }


    const customStyles = {
      control: (provided) => ({
        ...provided,
        backgroundColor: "transparent",
        border: "1px solid #3F88C5",
        borderRadius: "16px",
        width: "100%",
        height: "44px",
        fontSize: "14px",
      }),
      menu: (provided) => ({
        ...provided,
        padding: "0px",
        fontSize: "12px",
      }),
      option: (provided, state) => ({
        ...provided,
        ...styles.option,
        backgroundColor: state.isFocused ? "#3F88C5" : "white",
        color: state.isSelected ? "white" : "black",
        color: state.isFocused ? "white" : "black",
        fontSize: "12px",
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#3F88C5",
        color: "white",
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: "white",
      }),
      multiValueRemove: (provided) => ({
        ...provided,
      }),
    };


      if (!isOpen) return null;

  
    
    const isVenue = user.isVenue
    return (
      <div className={styles.container} onClick={handleClose}>
        <div className={styles.wrapper} onClick={handleWrapper}>

          <h3>Envoyer une proposition de booking</h3>
          <div className={styles.formElem}>
            <label>
             {isVenue ? "à l'artiste" : "Pour l'événement"}<span></span>
            </label>
            <span className={styles.title}>{isVenue ? artist.name : event.title}</span>
          </div>
          {isVenue ? <Select
                    placeholder="Choisissez un événement"
                    styles={customStyles}
                    options={eventsInfos}
                    onChange={handleEventChange}
                    value={eventsInfos.find((option) => option.value === eventBooking)}
                  /> : <></>}
          
          <div className={styles.formElem}>
            <label>
              Heure de début de la prestation <span>*</span>
            </label>
            <MobileTimePicker
              onChange={(e) => setHour_start(e)} 
              value={hour_start}
              minutesStep={15}
              className={styles.input}
              sx={{
                color: 'white',
                // backgroundColor: 'red',
                borderColor: '#3F88C5',
              }}
            />
          </div>
          <div className={styles.formElem}>
            <label>
              Durée de la prestation (h)<span>*</span>
            </label>
            <input type="number" onChange={(e) => setDuration(e.target.value)} value={duration} className={styles.input} min={'1'}>
            </input>
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
  
  export default CreateBookingProposal;
  
