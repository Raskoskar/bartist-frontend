import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styles from "../styles/ArtistForm.module.css";

export default function ArtistForm() {
  const [sceneName, setSceneName] = useState("");
  const [bio, setBio] = useState("");
  const [genres, setGenres] = useState([]); // Maintenant un tableau
  const [groupMembers, setGroupMembers] = useState("");
  const artist = useSelector((state) => state.artist.value);

  const genreOptions = [
    { label: "Rap", value: "rap" },
    { label: "Pop", value: "pop" },
    { label: "Techno", value: "techno" },
  ];

  const handleGenreChange = (event) => {
    // Transformer la collection HTMLCollection en tableau
    const selectedOptions = Array.from(event.target.options).filter(option => option.selected);
    const selectedValues = selectedOptions.map(option => option.value);
    setGenres(selectedValues);
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h2>Créez votre profil artiste</h2>
        <form className={styles.form}>
          <div className={styles.formElem}>
            <label>Votre nom de scène <span>*</span></label>
            <input
              className={styles.input}
              type="text"
              placeholder="Nom de scène..."
              onChange={(e) => setSceneName(e.target.value)}
              value={sceneName}
            />
          </div>
          <div className={styles.formElem}>
            <label>Bio</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Quelques mots sur vous..."
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <div className={styles.formElem}>
            <label>Genre <span>*</span></label>
            <select
              multiple
              onChange={handleGenreChange}
              className={styles.select}
              value={genres}
            >
              {genreOptions.map((genre) => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formElem}>
            <label>Votre groupe comporte combien de musiciens ? <span>*</span></label>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre de membres..."
              onChange={(e) => setGroupMembers(e.target.value)}
              value={groupMembers}
            />
          </div>
        </form>
        <div>{`Genres sélectionnés: ${genres.join(', ')}`}</div>
      </div>
    </div>
  );
}
