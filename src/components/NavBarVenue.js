import styles from '../styles/NavBarVenue.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import venue from '../reducers/venue';
import { venueLogOut } from '../reducers/venue';
import { useState } from "react";


function NavBarVenue(props) {

	const dispatch = useDispatch();
	const venue = useSelector((state) => state.venue.value);

    const handleLogout = () => {
		dispatch(venueLogOut());
	};


  return (

    <div className={styles.container}>
        <div className={styles.navTopContainer}>
            <div className={styles.navTop}>
                <button id="Logout" className={styles.logoutBtn} >Logout</button>
                <button id="Logout" className={styles.logoutBtn} >Logout</button>
                <Image 
                    className={styles.logo}
                    src=''
                    alt=""
                    // width={50}
                    // height={50}
                />
            </div>
        </div>
        <div className={styles.navLeftContainer}>
            <div className={styles.navContainer}>
            <Image 
                className={styles.logo}
                src=''
                alt=""
                // width={50}
                // height={50}
            />
            <h1>BarTist</h1>
            </div>
            <div className={styles.navLeftBtn}>
                <Link href="/Mes_événements_prévus"><span className={styles.link}>Mes événements prévus</span></Link>
				<Link href="/Chercher_un_artiste"><span className={styles.link}>Chercher un artiste</span></Link>
                <Link href="/Mes_propositions"><span className={styles.link}>Mes propositions</span></Link>
            </div>
            <div className={styles.navLeftBtn}>
                <Link href="/Settings"><span className={styles.linkSettings}>Settings</span></Link>
                <button id="Logout" className={styles.logoutBtn} onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    </div>
  );
}

export default NavBarVenue;

