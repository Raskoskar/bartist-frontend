import styles from '../styles/CardEvent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { deleteEvents, updateStatus } from '../api/events';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CardEvent({event}) {

    // function pour changer le statut d'un event
    const handleChangeStatus = () => {
        const status = ''// Définir le statut pour que au click le statut passe de draft a published et vice versa
        if(event.status === 'published'){
            status ='draft';
        } else if (event.status === 'draft'){
            status = 'published';
        }
        updateStatus();
    }

    // function pour supprimer un event
    const handleDeleteEvent = () => {
        deleteEvents();
    }

    //map pour afficher chaque events
    
    // useEffect(() => {
    //     console.log(event);
    // }, []);

    return(
        <div className={styles.card}>
            <Image 
                className={styles.pictureEvent}
                src={event.picture}
                alt={event.title}
                width={200}
                height={100}
            /> 
            <div className={styles.cardInfo}>
                <div className={styles.cardTitle}>
                    <h3 className={styles.cardTitle}>{event.title}</h3>
                </div>
                <div className={styles.cardSpan}>
                    <span className={styles.spanGenre}>{event.genres}</span>
                    <span onClick={() =>handleChangeStatus()} className={styles.spanStatus}>{event.status}</span>
                    <span className={styles.spanDate}>{event.date}</span>
                </div>
                <div className={styles.cardBtnDelete}>
                    <FontAwesomeIcon onClick={() => handleDeleteEvent()} icon={faWindowClose}  className={styles.actionIcon} />
                </div>
            </div>
        </div>
    );
}

export default CardEvent;