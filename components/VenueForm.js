import styles from '../styles/VenueForm.module.css';
import 'antd/dist/antd.css';
import { Button } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from "react";



function VenueForm(props) {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');

  return (
    <div>
        <div className={styles.formContainer}>
            <div className={styles.formSection}>
                <p className={styles.title}>Créer votre profil établissement</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className={styles.input} type="text" placeholder="Nom de l'établissement" id="formName"  />
                <input onChange={(e) => setAddress(e.target.value)} value={address} className={styles.input} type="text" placeholder="Adresse de l'établissement" id="formAddress" />
                <select onChange={(e) => setType(e.target.value)} value={type} placeholder="Vous représentez ?" className={styles.select} name="types" id="types-select">
                    <option value="">Vous représentez ?</option>
                    <option value="bar">Bar</option>
                    <option value="discotheque">Discothèque</option>
                    <option value=""></option>
                </select>                
                <input onChange={(e) => setDescription(e.target.value)} value={description} className={styles.input} type="text" placeholder="Quelques mots sur votre établissement..." id="formDescription"  />
            </div>
            <div className={styles.pictureSection}>
                <Image 
                    className={styles.twitterLogo}
                    src=''
                    alt=""
                    // width={}
                    // height={}
                    />
                <Button id="addPicture" className={styles.pictureBtn} >Ajouter une photo de profil</Button>        
            </div>
            <Button id="create" className={styles.createBtn} >Créer</Button>
        </div>
    </div>
  );
}

export default VenueForm;

