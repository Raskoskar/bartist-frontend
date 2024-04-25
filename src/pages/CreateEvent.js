//"use client"; // cloudinary : https://next.cloudinary.dev/nextjs-14
//import cloudinary from 'cloudinary';

import React from "react";
import { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/CreateEvent.module.css";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { customStyles } from "@/styles/CustomSlect";

import { createEvent } from "@/api/events";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import genreOptions from "@/data/genres.json";
import { uploadFile } from '@/api/upload';


export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hour_start, setHour_start] = useState();
  const [picture, setPicture] = useState("");
  const [genres, setGenres] = useState([]);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false); // État pour le chargement
  const [error, setError] = useState("");

  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  const handleGenreChange = (selectedOptions) => {
    setGenres(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const handleSubmit = (status) => {
    console.log(picture)
    try {
      createEvent(
        user.token,
        title,
        description,
        date,
        hour_start,
        picture,
        genres,
        status,
        facebook,
        instagram
      );
      router.push("/Events");
    } catch (e) {
      setError(
        `Failed to ${status === "Brouillon" ? "save" : "publish"} the event: ${
          e.message
        }`
      );
    }
  };

  //upload img
  const handleFileUpload = async (event) => {
    setLoading(true);
    const data = await uploadFile(event); // Récupère le fichier sélectionné par l'utilisateur
    setPicture(data.imageUrl); 
    setLoading(false);
  };

  return (
    <Layout>
      <div className={styles.main}>
        <h1>Créer un événement</h1>
        <form className={styles.form}>
          <div className={styles.column}>
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
              <label>
                Date de l'événement <span>*</span>
              </label>
              <DatePicker disablePast onChange={setDate} value={date} styles />
            </div>
            <div className={styles.formElem}>
              <label>Photo</label>
              <input
                type="file"
                onChange={handleFileUpload}
                accept="image/*" // Limite le type de fichiers acceptés aux images
                className={styles.input}
                name="image"
              />
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
          </div>
          <div className={styles.column}>
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
                Heure de début de l'événement <span>*</span>
              </label>
              <MobileTimePicker
                onChange={setHour_start}
                value={hour_start}
                minutesStep={15}
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
          </div>
          <div className={styles.btnContainer}>
            <button disabled={loading ? true : false} type="button" onClick={() => handleSubmit("Brouillon")}>
            {loading ? "Chargement" : "Enregister le brouillon"}
            </button>
            <button disabled={loading ? true : false} type="button" onClick={() => handleSubmit("Publié")}>
              {loading ? "Chargement" : "Publier"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
