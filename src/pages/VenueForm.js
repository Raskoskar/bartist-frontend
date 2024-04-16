import styles from '../styles/VenueForm.module.css';
// import 'antd/dist/antd.css';
// import { Button } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from "react";
import { useState } from "react";

function VenueForm(props) {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

  return (
    <div className={styles.formContainer}>
        <form className={styles.form}>
            <h2 className={styles.title}>Créer votre profil établissement</h2>
            <div className={styles.formPicture}>               
                <div className={styles.formSection}>
                    <input onChange={(e) => setName(e.target.value)} value={name} className={styles.input} type="text" placeholder="Nom de l'établissement" id="formName"  />
                    <input onChange={(e) => setAddress(e.target.value)} value={address} className={styles.input} type="text" placeholder="Adresse de l'établissement" id="formAddress" />
                    <select onChange={(e) => setType(e.target.value)} value={type} placeholder="Vous représentez ?" className={styles.inputSelect} name="types" id="types-select">
                        <option value="" className={styles.option}>Vous représentez ?</option>
                        <option value="bar" className={styles.option}>Bar</option>
                        <option value="discotheque" className={styles.option}>Discothèque</option>
                        <option value="restaurant" className={styles.option}>Restaurant</option>
                        <option value="salle de concert" className={styles.option}>Salle de concert</option>
                    </select>                
                    <input onChange={(e) => setDescription(e.target.value)} value={description} className={styles.input} type="text" placeholder="Quelques mots sur votre établissement..." id="formDescription"  />
                </div>
                <div className={styles.pictureSection}>
                    <Image 
                        className={styles.pictureProfil}
                        src=''
                        alt=""
                        // width={50}
                        // height={50}
                        />
                    <button id="addPicture" className={styles.pictureBtn} >Ajouter une photo de profil</button>        
                </div>
            </div>
            <button id="create" className={styles.createBtn} >Créer</button>
        </form>
    </div>
  );
}

export default VenueForm;

