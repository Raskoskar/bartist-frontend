import styles from "@/styles/CardEventInfo.module.css";
import Image from 'next/image';
import { deleteEvents, updateEventStatus } from '../api/events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';


function CardEventInfo({isOpen, onClose, event}) {

    const [isDelete, setIsDelete] = useState(false); //Définit un etat pour gerer l'affichage, false par defaut

    if (!isOpen) return null;

    const handleEventClose = () => {
        onClose();
      };
    
      const handleEventWrapper = (event) => {
        event.stopPropagation();
      };
          
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
    

    return(
        <div onClick={handleEventClose} className={`${styles.container} ${isOpen ? styles.open : ''}`}>
            <div onClick={handleEventWrapper} className={`${styles.wrapper} ${isOpen ? styles.open : ''}`}>
                        <Image 
                            className={styles.pictureEvent}
                            src={event.picture}
                            alt={event.title}
                            width={200}
                            height={100}
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
                    </div>
                    <div className={styles.cardBtns}>
                        <div className={styles.cardBtnDelete}>
                            <FontAwesomeIcon onClick={ handleDeleteEvent } icon={faWindowClose}  className={styles.deleteIcon} size='2xl'/>
                        </div>
                        <div className={styles.cardBtnPublish}>
                            {/* affichage conditionnel => si event.status est en Draft alors tu affiche un bouton pour changer le status, sinon si le status est en Published, le btn ne s'affiche pas*/}
                            {event.status === 'Draft' && <FontAwesomeIcon onClick={ handleChangeStatus } icon={faCheck} className={styles.publishIcon} size='2xl'/>}
                        </div>
                    </div>
            </div>
        </div>

    );
};

export default CardEventInfo;