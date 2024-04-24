import styles from '../styles/VenueForm.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { updateProfilVenue } from "@/api/venues"; // import route POST; @ permet d'acceder a la racine du projet
import { uploadFile } from '@/api/upload';

function VenueForm() {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');

    const user = useSelector((state) => state.user.value);// Pour utiliser le token du reducer venue

    const router = useRouter(); //pour les redirections

    // submit formulaire creation profil etablissement
    const handleSubmit = async () => {
        const dataVenues = await updateProfilVenue(user.token, name, address, type, description, picture);
        console.log('dataVenues =>', dataVenues);
            if(dataVenues.result){
                console.log('dataVenues =>', dataVenues);
                router.push("/Events")
            } else {
                document.querySelector("#alert").innerHTML = `Creation failed : ${dataVenues.error}`;
            }
    }

    //upload img
    const handleFileUpload = async (event) => {
        console.log("event", event);
        const data = await uploadFile(event); // Récupère le fichier sélectionné par l'utilisateur
        console.log("data", data);
        setPicture(data.imageUrl); // recupere l'url du fichier sur cloudinary 
    };

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
                    <input onChange={(e) => setDescription(e.target.value)} value={description} className={styles.inputSelect} type="text" placeholder="Quelques mots sur votre établissement..." id="formDescription"  />
                </div>
                <div className={styles.pictureSection}>
                    {/* <Image 
                        className={styles.pictureProfil}
                        src=''
                        alt=""
                        // width={50}
                        // height={50}
                        /> */}
                    {/* <input onChange={(e) => setPicture(e.target.value)} id="addPicture" value={picture} className={styles.inputPicture} type="text" placeholder='photo de profil' />*/}
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        accept="image/*" // Limite le type de fichiers acceptés aux images
                        className={styles.inputFile}
                        name="image"
                    />
                </div>
            </div>
            <button type='button' onClick={() => handleSubmit()} id="create" className={styles.createBtn} >Créer</button>
        </form>
        <div id="alert"></div>
    </div>
  );
}

export default VenueForm;