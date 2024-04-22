import styles from '../styles/CardEvent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { deleteEvents, updateEventStatus } from '../api/events';
import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { useRouter } from "next/router";
import CardEventInfo from './CardEventInfo';

function CardEvent({event}) {

    const token = useSelector(state => state.user.value.token );
    const router = useRouter();
    const [isDelete, setIsDelete] = useState(false); //Définit un etat pour gerer l'affichage, false par defaut
    // État pour contrôler la visibilité du modal
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);


    // fonction pour changer le statut d'un event
    const handleChangeStatus = () => {
        // definit const a Published, care si il est Published pas besoin de generer l'affichage conditionnel
        const status = 'Published';
        updateEventStatus(status, event._id); // on passe status en parametre comme definit dans la route et on appel le parametre event avec l'id definit dans le body de la route
        // Update the status
        
    }

    // fonction pour supprimer un event
    const handleDeleteEvent = () => {
        console.log(event._id);
        deleteEvents(event._id); // on appel le parametre event avec l'id definit dans le body de la route.
        // router.reload();
        setIsDelete(true); // L'etat passe a true lorsqu'on clique sur l'icone supprime le bloc sans avoir a rafraichir la page
    }
    //si supprimer, on n'affiche rien
    if(isDelete){
        return null;
    }

    //Formattage date
    const date = new Date(event?.date); // s'il y a une date
    const optionDate = { day: 'numeric', month: 'long', year: 'numeric'};
    const formattedDate = new Intl.DateTimeFormat('fr-FR', optionDate).format(date);

    // const time = new Date(event?.hour_start); // s'il y a une heure
    // const optionTime = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
    // const formattedTime = new Intl.DateTimeFormat('fr-FR', optionTime).format(time);

    // Fonction pour ouvrir les modals
    const openEventModal = (type) => {
        setIsEventModalOpen(true);
    };

    // Fonction pour fermer le modal
    const closeEventModal = () => {
        setIsEventModalOpen(false);
    };

    //map pour afficher chaque events
    
    // useEffect(() => {
    //     console.log(event);
    // }, []);
     
  

    return(
        <>
            <div className={styles.card} onClick={() => openEventModal()}>
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
                        <span  className={styles.spanStatus}>{event.status}</span>
                        <span className={styles.spanDate}>{formattedDate}</span>
                        <span className={styles.spanDate}>{event.hour_start}</span>
                    </div>
                    <div className={styles.cardBtns}>
                        <div className={styles.cardBtnDelete}>
                            <FontAwesomeIcon onClick={ handleDeleteEvent} icon={faWindowClose}  className={styles.deleteIcon} size='2xl'/>
                        </div>
                        <div className={styles.cardBtnPublish}>
                        {/* affichage conditionnel, si event.status est en Draft alors tu affiche un bouton pour changer le status, sinon si le status est en Published, le btn ne s'affiche pas*/}
                            {event.status === 'Draft' && <FontAwesomeIcon onClick={ handleChangeStatus } icon={faCheck} className={styles.publishIcon} size='2xl'/>}
                        </div>
                    </div>
                </div>
            </div>
            <CardEventInfo isOpen={isEventModalOpen} onClose={closeEventModal} event={event} />
    </>
    );
}

export default CardEvent;