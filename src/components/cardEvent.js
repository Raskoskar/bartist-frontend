import styles from '../styles/CardEvent.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from "react";
import { useDispatch,  useSelector } from 'react-redux';

function CardEvent() {
	const dispatch = useDispatch();

    return(
            <div className={styles.card}>
                <Image 
                    className={styles.pictureEvent}
                    src='/img.png'
                    alt="img"
                    width={200}
                    height= {100}
                /> 
                <h3 className={styles.cardTitle}>titre</h3>
                <div className={styles.cardInfo}>
                    <span>Concert</span>
                    <span>17/04</span>
                </div>
            </div>
    );
}

export default CardEvent;