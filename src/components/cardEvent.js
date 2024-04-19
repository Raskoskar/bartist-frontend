import styles from '../styles/CardEvent.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { displayEvents } from '../api/events';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CardEvent() {

    //État local pour stocker les événements récupérés depuis l'api events
    const [events, setEvents] = useState([]); 
    // Creation const token pour recuperer le token du reducer afin de pouvoir s'en servir dans le param
    const token = useSelector(state => state.user.value.token )

    // appel createEvent lorsqu'on appel le composant
    useEffect(() => {
        getEvents();
    }, []);

    // Recuperation des events
    const getEvents = async () => {
        try {
            const dataEvent = await displayEvents(token);
            console.log('dataEvent => ', dataEvent);
            console.log('token => ', token);
            if(dataEvent) {
                // console.log('dataEvent => ', dataEvent);
                setEvents(dataEvent);
            }
        } catch (error) {
            console.log('error fetch dataEvent => ', error);
        }
    }
    //map pour afficher chaque events
    const eventComponents = events.map((dataEvent, i ) => (
        <div className={styles.card} key={i}>
            <Image 
                className={styles.pictureEvent}
                src={dataEvent.picture}
                alt={dataEvent.title}
                width={200}
                height={100}
            /> 
            <h3 className={styles.cardTitle}>{dataEvent.title}</h3>
            <div className={styles.cardInfo}>
                <span>{dataEvent.genres}</span>
                <span>{dataEvent.status}</span>
                <span>{dataEvent.date}</span>
            </div>
        </div>
    ));

    return(
            <>
                {eventComponents}
            </>
    );
}

export default CardEvent;