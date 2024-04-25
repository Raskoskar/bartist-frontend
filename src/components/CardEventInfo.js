import styles from "@/styles/CardEventInfo.module.css";
import Image from 'next/image';
import { deleteEvents, updateEventStatus } from '../api/events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useSelector } from "react-redux";

function CardEventInfo({ isOpen, onClose, event }) {
    const isVenue = useSelector((state) => state.user.value.isVenue)
    const [isDelete, setIsDelete] = useState(false); // État pour gérer si l'événement est supprimé

    if (!isOpen) return null; // Ne rien rendre si le modal n'est pas ouvert

    const handleEventClose = () => onClose();

    const handleEventWrapper = (event) => event.stopPropagation();

    const handleChangeStatus = async () => {
        try {
            await updateEventStatus('Published', event._id);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut:", error);
        }
    }

    const handleDeleteEvent = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
            try {
                await deleteEvents(event._id);
                setIsDelete(true); // Met à jour l'état pour supprimer le composant de l'UI
            } catch (error) {
                console.error("Erreur lors de la suppression de l'événement:", error);
            }
        }
    }

    if (isDelete) return null; // Ne rien rendre si l'événement a été supprimé

    return (
        <div onClick={handleEventClose} className={`${styles.container} ${isOpen ? styles.open : ''}`}>
            <div onClick={handleEventWrapper} className={styles.wrapper}>
                <Image
                    className={styles.pictureEvent}
                    src={event?.picture != "" ? event.picture : '/assets/noevent.png'}
                    alt={event.title}
                    width={350}
                    height={350}
                />
                <div className={styles.cardModalInfo}>
                    <div className={styles.title}>
                        <h4>Titre :</h4>
                        <h3>{event.title}</h3>
                    </div>
                    <div className={styles.description}>
                        <h4>Description :</h4>
                        <p>{event.description}</p>
                    </div>
                </div>{isVenue ?  <div className={styles.cardBtns}>
                    <FontAwesomeIcon onClick={handleDeleteEvent} icon={faWindowClose} className={styles.deleteIcon} size='2xl' />
                    {event.status === 'Draft' && <FontAwesomeIcon onClick={handleChangeStatus} icon={faCheck} className={styles.publishIcon} size='2xl' />}
                </div> : <></> }
               
            </div>
        </div>
    );
};

export default CardEventInfo;
