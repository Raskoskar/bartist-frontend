import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styles from "../styles/ArtistForm.module.css";
import Select from "react-select";
import { useRouter } from "next/router";
import { updateArtist } from "@/api/artists";
import genreOptions from "@/data/genres.json";
import typeOptions from "@/data/artistType";
import { customStyles } from "@/styles/CustomSlect";
import { uploadFile } from "@/api/upload";

export default function ArtistForm() {
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

  const [firstStep, SetFirstStep] = useState(1);
  const artist = useSelector((state) => state.user.value);
  const router = useRouter();
  const [buttonText, setButtonText] = useState("Suivant");
  const [loading, setLoading] = useState(false);

  const handleGenreChange = (selectedOptions) => {
    setGenres(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };
  const handleTypeChange = (selectedOptions) => {
    setType(selectedOptions.value);
  };
  const handleSubmit = async () => {
    const data = await updateArtist(
      artist.token,
      name,
      type,
      description,
      members,
      picture,
      genres,
      medias,
      youtube,
      souncloud,
      facebook,
      deezer,
      spotify
    );

    if (data.result) {
      router.push("/Search");
    } else {
      document.querySelector(
        "#alert"
      ).innerHTML = `Login failed : ${data.error}`;
    }
  };

  const handleFileUpload = async (event) => {
    setLoading(true);
    const data = await uploadFile(event); // Récupère le fichier sélectionné par l'utilisateur
    setPicture(data.imageUrl); // recupere l'url du fichier sur cloudinary
    setLoading(false);
  };

  return (
    <div className={styles.blurBg}>
      <div className={styles.main}>
        <div className={styles.card}>
          <h2>Créez votre profil artiste</h2>
          <form className={styles.form}>
            {firstStep == 1 ? (
              <>
                <div className={styles.formElem}>
                  <label>
                    Votre nom de scène <span>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Nom de scène..."
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Type d'artiste</label>
                  <Select
                    styles={customStyles}
                    options={typeOptions}
                    onChange={handleTypeChange}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Description</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Quelques mots sur vous..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Genre(s) <span>*</span>
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
                    type="text"
                    placeholder="Nombre de membres..."
                    onChange={(e) => setMembers(e.target.value)}
                    value={members}
                    className={styles.input}
                  />
                </div>
                <button onClick={() => SetFirstStep(firstStep + 1)}>
                  Suivant
                </button>
              </> // ^ variable d'etat pour passer de page en page.
            ) : firstStep == 2 ? (
              <>
                <div className={styles.container2}>
                  <div className={styles.formElem}>
                    <label>Photo de profil</label>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept="image/*" // Limite le type de fichiers acceptés aux images
                      className={styles.inputFile}
                      name="image"
                    />
                  </div>
                  <div className={styles.formElem}>
                    <label>Medias</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Ajoutez des images ou vidéos de vos prestations..."
                      onChange={(e) => {
                        setMedias(e.target.value);
                        setButtonText("Suivant");
                      }}
                      value={medias}
                    />
                  </div>
                </div>

                <div className={styles.btnDiv}>
                  <button
                    type="button"
                    onClick={() => SetFirstStep(firstStep - 1)}
                  >
                    Précédent
                  </button>
                  <button
                    disabled={loading ? true : false}
                    type="button"
                    onClick={() => SetFirstStep(firstStep + 1)}
                  >
                    {loading ? "Chargement..." : buttonText}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Ajoutez vos réseaux</h3>
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
                <div className={styles.btnDiv}>
                  <button
                    type="button"
                    onClick={() => SetFirstStep(firstStep - 1)}
                  >
                    Précédent
                  </button>
                  <button type="button" onClick={() => handleSubmit()}>
                    Créer le profil
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
        <div id="alert"></div>
      </div>
    </div>
  );
}
