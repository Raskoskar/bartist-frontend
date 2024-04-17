import React from "react";
import { useState } from "react";
import Layout from "@/components/Layout"
import styles from "@/styles/CreateEvent.module.css"
import Select from "react-select"
import { useSelector } from "react-redux";

import { createEvent } from "@/api/events";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import moment from 'moment'




export default function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [hour_start, setHour_start] = useState(); //à finir
    const [picture, setPicture] = useState('');
    const [genres, setGenres] = useState([]);
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState();

    const user = useSelector((state) => state.user.value);// Pour utiliser le token du reducer venue

    const genreOptions = [
        { label: "Rap", value: "rap" },
        { label: "Pop", value: "pop" },
        { label: "Techno", value: "techno" },
      ];

    const handleGenreChange = (selectedOptions) => {
        setGenres(
          selectedOptions ? selectedOptions.map((option) => option.value) : []
        );
      };

      const handleSave = () => {
        setStatus('Draft');
        createEvent(    user.token,
          title,
          description,
          date,
          hour_start,
          picture,
          genres,
          status,
          facebook,
          instagram,);
      };

      const handlePublish = () => {
        setStatus('Published')
        createEvent();
      };

      //const handleSave à rajouter
      //const handlePublish à rajouter

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
      <Layout /* isSelected="#search" */>
        <div className={styles.main}>
          <form className={styles.form}>
            <h1>Créez un événement</h1>
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
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            <div className={styles.formElem}>
              <label>
                Date de l'événement <span>*</span>
              </label>
              <DatePicker disablePast onChange={(e) => {console.log(e), setDate(e)}} value={date} slotProps={{
    textField: {
    }
    
  }}/>
            </div>
            <div className={styles.formElem}>
              <label>
                Heure de début de l'événement <span>*</span>
              </label>
              <MobileTimePicker 
              onChange={(e) => setHour_start(e)} value={hour_start}  />
            </div>
            <div className={styles.formElem}>
              <label>
                Genres musicaux <span>*</span>
              </label>
              <Select
                isMulti
                styles={customStyles}
                options={genreOptions}
                onChange={handleGenreChange}
              />
            </div>
            <div className={styles.formElem}>
              <label>Photo</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Ajouter une photo d'illustration..."
                onChange={(e) => setPicture(e.target.value)}
                value={picture}
              />
            </div>
            <div className={styles.btnDiv}></div>
            <h3>Avez-vous créé des posts ou événéments sur vos réseaux ?</h3>
            <div className={styles.formElem}>
              <label>Facebook</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Lien vers un événement Facebook..."
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
              />
            </div>
            <div className={styles.formElem}>
              <label>Instagram</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Lien vers un post Instagram..."
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
              />
            </div>
            <div className={styles.btnContainer}>
              <div className={styles.btnDiv}>
                <button type="button" onClick={() => handleSave()}>
                  Enregistrer en brouillon
                </button>
              </div>
              <div className={styles.btnDiv}>
                <button type="button" onClick={() => handlePublish()}>
                  Publier l'événement
                </button>
              </div>
            </div>
          </form>
          <div id="alert"></div>
        </div>
      </Layout>
    );
}
