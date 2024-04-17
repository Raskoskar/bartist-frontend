import React from "react";
import { useState } from "react";

export default function CreateEvents() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(''); //à rajouter dans le form
    const [hour_start, setHour_start] = useState(''); //à rajouter dans le form
    const [picture, setPicture] = useState('');
    const [genres, setGenres] = useState([]);
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");


    const handleGenreChange = (selectedOptions) => {
        setGenres(
          selectedOptions ? selectedOptions.map((option) => option.value) : []
        );
      };

      //const handleSaveDraft à rajouter
      //const handleSubmit à rajouter

      // Style du Composant React Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #3F88C5",
      borderRadius: "16px",
      width: "300px",
      height: "44px",
      fontSize: "14px",
    }),
    menu: (provided) => ({
      ...provided,
      padding: "0px",
      fontSize: "12px",
    }),
    option: (provided, state) => ({
      ...provided,
      ...styles.option,
      backgroundColor: state.isFocused ? "#3F88C5" : "white",
      color: state.isSelected ? "white" : "black",
      color: state.isFocused ? "white" : "black",
      fontSize: "12px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#3F88C5",
      color: "white",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
    }),
  };

    return (
    <div className={styles.main}>
    <h1>Créez un événement</h1>
    <div className={styles.card}>
      <form className={styles.form}>
            <div className={styles.formElem}>
              <label>
                Titre de l'événément <span>*</span>
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Titre de l'événément..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className={styles.formElem}>
              <label>Description</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Quelques mots sur l'événement..."
                onChange={(e) =>setDescription(e.target.value)}
                value={description}
              />
            </div>
            /*div date et heure de début à rajouter*/
            <div className={styles.formElem}>
              <label>
                Type <span>*</span>
              </label>
              <Select
                styles={customStyles}
                options={typeOptions}
                onChange={handleTypeChange}
              />
            </div>

            <div className={styles.formElem}>
              <label>
                Genre <span>*</span>
              </label>
              <Select
                isMulti
                styles={customStyles}
                options={genreOptions}
                onChange={handleGenreChange}
              />
            </div>
          <div className={styles.formElem}>
              <label>
                Picture
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Ajouter une photo d'illustration..."
                onChange={(e) => setPicture(e.target.value)}
                value={picture}
              />
            </div>
            <div className={styles.btnDiv}>
            </div>
            <h3>Avez-vous créé des posts ou événéments sur vos réseaux ?</h3>
            <div className={styles.formElem}>
              <label>
                Facebook 
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Lien vers un événement Facebook..."
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
              />
            </div>
            <div className={styles.formElem}>
              <label>
                Instagram 
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Lien vers un post Instagram..."
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
              />
            </div>
            <div className={styles.btnDiv}>
            <button type="button"  onClick={() => handleSubmit()}>Créer l'événement</button>
            </div>
      </form>
    </div>
    <div id="alert"></div>
  </div>
);
}
