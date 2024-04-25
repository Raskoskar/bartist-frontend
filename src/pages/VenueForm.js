import styles from "../styles/VenueForm.module.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { updateProfilVenue } from "@/api/venues"; // import route POST; @ permet d'acceder a la racine du projet
import { uploadFile } from "@/api/upload";
import venueType from "@/data/venueType";
import Select from "react-select";
import { customStyles } from "@/styles/CustomSlect";
function VenueForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const user = useSelector((state) => state.user.value); // Pour utiliser le token du reducer venue

  const router = useRouter(); //pour les redirections

  // submit formulaire creation profil etablissement
  const handleSubmit = async () => {
    const dataVenues = await updateProfilVenue(
      user.token,
      name,
      address,
      type,
      description,
      picture
    );
    if (dataVenues.result) {
      router.push("/Events");
    } else {
      document.querySelector(
        "#alert"
      ).innerHTML = `Creation failed : ${dataVenues.error}`;
    }
  };

  //upload img
  const handleFileUpload = async (event) => {
    console.log("event", event);
    const data = await uploadFile(event); // Récupère le fichier sélectionné par l'utilisateur
    console.log("data", data);
    setPicture(data.imageUrl); // recupere l'url du fichier sur cloudinary
  };
  const handleTypeChange = (selectedOptions) => {
    setType(selectedOptions.value);
  };
  return (
    <div className={styles.blurBg}>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <h2 className={styles.title}>Créez votre profil établissement</h2>
          <div className={styles.formPicture}>
            <div className={styles.formSection}>
            <label>
                    Nom de l'établissement <span>*</span>
                  </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={styles.input}
                type="text"
                required
                placeholder="Nom de l'établissement"
                id="formName"
              />
              <label>
                    Adresse de l'établissement <span>*</span>
                  </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className={styles.input}
                type="text"
                required
                placeholder="Adresse de l'établissement"
                id="formAddress"
              />
              <label>
                    Type d'établissement <span>*</span>
                  </label>
              <Select
                onChange={handleTypeChange}
                styles={customStyles}
                    options={venueType}
              />
              <label>
                    Description <span>*</span>
                  </label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={styles.inputSelect}
                type="text"
                placeholder="Quelques mots sur votre établissement..."
                id="formDescription"
              />
            </div>
            <div className={styles.pictureSection}>
              {/* <Image 
                        className={styles.pictureProfil}
                        src=''
                        alt=""
                        // width={50}
                        // height={50}
                        /> */}
              <label>Photo de profil</label>
              <input
                type="file"
                onChange={handleFileUpload}
                accept="image/*" // Limite le type de fichiers acceptés aux images
                className={styles.inputFile}
                name="image"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleSubmit()}
            id="create"
            className={styles.createBtn}
          >
            Créer le profil
          </button>
        </form>
        <div id="alert"></div>
      </div>
    </div>
  );
}

export default VenueForm;
