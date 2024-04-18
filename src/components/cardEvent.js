import styles from '../styles/CardEvent.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { createEvent } from '../api/events';
import React, { useEffect, useState } from 'react';

function CardEvent() {

    //État local pour stocker les événements récupérés depuis l'api events
    const [events, setEvents] = useState([]); 

    // appel createEvent lorsqu'on appel le composant
    useEffect(() => {
        createEvent()
    }, []);
    // Recuperation des events
    const displayEvent = async () => {
        try {
            const dataEvent = await createEvent();
            setEvents(dataEvent);
        } catch (error) {
            console.log('error fetch dataEvent => ', error);
        }
    }
    //map pour afficher chaque events
    const event = events.map((dataEvent, i ) => (
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
                <span>Concert</span>
                <span>17/04{dataEvent.date}</span>
            </div>
        </div>
    ));

    return(
            // <div className={styles.card}>
            //     <Image 
            //         className={styles.pictureEvent}
            //         // src='/img.png'
            //         src={events.picture}
            //         alt={event.picture}
            //         width={200}
            //         height= {100}
            //     /> 
            //     <h3 className={styles.cardTitle}>titre{event.title}</h3>
            //     <div className={styles.cardInfo}>
            //         <span>Concert</span>
            //         <span>17/04{event.date}</span>
            //     </div>
            // </div>
            <div>
                {event}
            </div>
    );
}

export default CardEvent;