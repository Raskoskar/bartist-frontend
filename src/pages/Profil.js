import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import styles from "@/styles/Profil.module.css";
import Select from "react-select";
import { useState } from "react";

export default function Profil() {
  // Variables d'états
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [genres, setGenres] = useState([]);
  const [members, setMembers] = useState("");
  const [picture, setPicture] = useState("");
  const [medias, setMedias] = useState([""]);
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [deezer, setDeezer] = useState("");
  const [spotify, setSpotify] = useState("");
  const [souncloud, setSoundcloud] = useState("");
  const [adresse, setAdresse] = useState("");
  const [venueType, setVenueType] = useState("");

  // Savoir si l'utilisateur est un artiste ou un établissement pour gérer l'affichage.
  const user = useSelector((state) => state.user.value);
  const isVenue = user.isVenue;
  // Récupération des
  // Options pour les select et logique d'attribution aux var d'états
  const genreOptions = [
    { label: "Rap", value: "rap" },
    { label: "Pop", value: "pop" },
    { label: "Techno", value: "techno" },
  ];
  const typeOptions = [
    { label: "DJ", value: "dj" },
    { label: "Chanteur", value: "chanteur" },
    { label: "groupe", value: "groupe" },
  ];

  const venueOptions = [
    { label: "Bar", value: "bar" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Salle de concert", value: "salle de concert" },
    { label: "Salle de spectacle", value: "salle de spectacle" },
  ];

  const handleGenreChange = (selectedOptions) => {
    setGenres(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };
  const handleTypeChange = (selectedOptions) => {
    setType(selectedOptions.value);
  };
  const handleVenueChange = (selectedOptions) => {
    setVenueType(selectedOptions.value);
  };

  // Style du Composant React Select
  // (provided) => au lieu de garder le style natif on aplique ce qui est en desous
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #3F88C5",
      borderRadius: "16px",
      width: "100%",
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
    <Layout>
      <div className={styles.main}>
        <div className={styles.formContent}>
          <h1>Mon Profil {isVenue ? "établissement" : "artiste"}</h1>
          {isVenue ? (
            <>
              <h2>Ajouter une image de couverture</h2>
              <p>
                Ajoutez une image de votre établissement pour attirer de
                nouveaux clients
              </p>
              <div className={styles.imgContainer}></div>
            </>
          ) : (
            <>
              <h2>Ajouter une image de Profil</h2>
              <p>
                Ajoutez une photo de profil pour attirer l'oeil des
                organisateurs d'évènements
              </p>
              <div></div>
            </>
          )}

          <hr />
          <div className={styles.formContent}>
            <div className={styles.formContent}>
              <image></image>
              <h2>Informations générales</h2>
            </div>
            <div className={styles.formElem}>
              <label>
                {isVenue ? "Nom de l'établissement" : "Nom de scène"}{" "}
                <span>*</span>
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder={`Votre nom ${
                  isVenue ? "d'établissemnt" : "de scène"
                }...`}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className={styles.formElem}>
              <label>
                Description <span>*</span>
              </label>
              <input
                className={styles.input}
                type="text"
                placeholder="Quelques mots sur vous..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            {isVenue ? (
              <>
                <div className={styles.formElem}>
                  <label>
                    Adresse <span>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Adresse de l'établissement..."
                    onChange={(e) => setAdresse(e.target.value)}
                    value={adresse}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Type d'établissement <span>*</span>
                  </label>
                  <Select
                    styles={customStyles}
                    options={venueOptions}
                    onChange={handleVenueChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.formElem}>
                  <label>Type d'artiste</label>
                  <Select
                    styles={customStyles}
                    options={typeOptions}
                    onChange={handleTypeChange}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Genre musical <span>*</span>
                  </label>
                  <Select
                    isMulti // permet la selection multiple
                    styles={customStyles} // voir ci-dessus
                    options={genreOptions}
                    onChange={handleGenreChange}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Votre groupe comporte combien de musiciens ? <span>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Nombre de membres..."
                    onChange={(e) => setMembers(e.target.value)}
                    value={members}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Medias</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Ajouter des images ou vidéos de vos prestations..."
                    onChange={(e) => {
                      setMedias(e.target.value);
                    }}
                    value={medias}
                  />
                </div>
                <hr />

                <>
                  <h3>Ajouter vos réseaux</h3>
                  <div className={styles.formElem}>
                    <label>Youtube</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Lien vers votre chaine youtube..."
                      onChange={(e) => setYoutube(e.target.value)}
                      value={youtube}
                    />
                  </div>
                  <div className={styles.formElem}>
                    <label>Deezer</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Lien vers votre profil Deezer..."
                      onChange={(e) => setDeezer(e.target.value)}
                      value={deezer}
                    />
                  </div>
                  <div className={styles.formElem}>
                    <label>Spotify</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Lien vers votre Spotify..."
                      onChange={(e) => setSpotify(e.target.value)}
                      value={spotify}
                    />
                  </div>
                  <div className={styles.formElem}>
                    <label>SoundCloud</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Lien vers votre SoundCloud..."
                      onChange={(e) => setSoundcloud(e.target.value)}
                      value={souncloud}
                    />
                  </div>
                  <div className={styles.formElem}>
                    <label>Facebook</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Lien vers votre Facebook..."
                      onChange={(e) => setFacebook(e.target.value)}
                      value={facebook}
                    />
                  </div>
                </>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
