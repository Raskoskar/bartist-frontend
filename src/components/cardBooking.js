import styles from '../styles/CardBooking.module.css';
import Image from 'next/image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';

import { updateBookingStatus } from '../api/bookings';

export default function CardBooking(props) {

    //État local pour stocker les événements récupérés depuis l'api bookings


    const handleConfirmBooking = () => {
        const status = 'Confirmed';
        props.updateBookingStatus(status)
	}

    const handleRefuseBooking = () => {
        const status = 'Refused';
        props.updateBookingStatus(status)
	}

    const buttons = (
        <>
            <FontAwesomeIcon onClick={() => handleConfirmBooking()} icon={faCheckSquare}  className={styles.actionIcon} />
            <FontAwesomeIcon onClick={() => handleRefuseBooking()} icon={faWindowClose}  className={styles.actionIcon} />
        </>
    )


    return (
        <div className={styles.card}>
            {/* <Image 
                className={styles.pictureEvent}
                src={props.picture}
                alt={props.title}
                width={200}
                height={100}
            />  */}
            <h3 className={styles.cardTitle}>{props.title}</h3>
            <div className={styles.cardInfo}>
            <span>{props.venue}</span>
                <span>{props.description}</span>
                <span>{props.date}</span>
                <span>{props.rate}</span>
                <span>{props.hour_start}</span>
                <span>{props.duration} hour(s)</span>
                {props.status === 'Pending' && buttons}
                {(props.status === 'Confirmed' || props.status === 'Refused') && <span>{props.status}</span>}

            </div>
        </div>
    )
  }
