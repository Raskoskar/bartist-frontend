import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import styles from "@/styles/Profil.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getProfile } from "@/utils/getProfil";
import { updateArtist } from "@/api/artists";
import { updateProfilVenue } from "@/api/venues";
import genreOptions from "@/data/genres.json";
import { useRouter } from "next/router";
import CreateBookingProposal from "@/components/CreateBookingProposal";
import { customStyles } from "@/styles/CustomSlect";
import ArtistTypeOptions from "@/data/artistType";
import VenuTypeOptions from "@/data/venueType";
import { uploadFile } from "@/api/upload";

export default function Profile() {
  // Variables d'états
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [genres, setGenres] = useState([""]);
  const [members, setMembers] = useState("");
  const [picture, setPicture] = useState("");
  const [medias, setMedias] = useState([""]);
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [deezer, setDeezer] = useState("");
  const [spotify, setSpotify] = useState("");
  const [souncloud, setSoundcloud] = useState("");
  const [adress, setAdress] = useState("");
  const [venueType, setVenueType] = useState("");
  const [profile, setProfile] = useState({});

  // Savoir si l'utilisateur est un artiste ou un établissement pour gérer l'affichage.
  const user = useSelector((state) => state.user.value);
  const isVenue = user.isVenue;
  const router = useRouter();

  // Récupération des informations utilisateurs en BDD :
  useEffect(() => {
    getProfile(user.token, user.isVenue).then((response) => {
      if (!isVenue) {
        setProfile(response);
      } else if (isVenue) {
        setProfile(response.venue);
      } else {
        console.log("error in getProfile");
      }
    });
  }, []);

  // Fonction de gestion selection des genres musicals
  const handleGenreChange = (selectedOptions) => {
    setGenres(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  // Fcontion de gestion selection du type d'artiste
  const handleTypeChange = (selectedOptions) => {
    setType(selectedOptions.value);
  };

  // Fonction de gestion selection du type d'établissement
  const handleVenueChange = (selectedOptions) => {
    setVenueType(selectedOptions.value);
  };

  const handleFileUpload = async (event) => {
    console.log("event", event);
    const data = await uploadFile(event); // Récupère le fichier sélectionné par l'utilisateur
    console.log("data", data);
    setPicture(data.imageUrl); // recupere l'url du fichier sur cloudinary
  };

  // Fonction de mise à jour du profil utilisateur:
  const handleUpdateProfil = async () => {
    let data = null;
    if (!isVenue) {
      data = await updateArtist(
        user.token,
        name != "" ? name : profile.name,
        type != "" ? type : profile.type,
        description != "" ? description : profile.description,
        members != "" ? members : profile.members,
        picture != "" ? picture : profile.picture,
        genres.length > 0 ? genres : profile.genres,
        medias != [] ? medias : profile.medias,
        youtube != "" ? youtube : profile.medias.youtube,
        souncloud != "" ? souncloud : profile.socials.soundcloud,
        facebook != "" ? facebook : profile.socials.facebook,
        deezer != "" ? deezer : profile.socials.deezer,
        spotify != "" ? spotify : profile.socials.spotify
      );
    } else {
      data = await updateProfilVenue(
        user.token,
        name != "" ? name : profile.name,
        adress != "" ? adress : profile.adress,
        venueType != "" ? venueType : profile.type,
        description != "" ? description : profile.description,
        picture != "" ? picture : profile.picture
      );
    }
    if (data.result) {
      router.reload();
    } else {
      console.error(data.error);
    }
  };

  // Style du Composant React Select
  // (provided) => au lieu de garder le style natif on aplique ce qui est en desous

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>
            Mon Profil {isVenue ? "établissement" : "artiste"}
          </span>
        </div>
        <div
          className={`${styles.formContainer} ${
            !isVenue ? styles.twoColumns : ""
          }`}
        >
          {!isVenue && (
            <>
              <div>
                <span className={styles.exp}>Informations générales</span>
                <hr />
                <div className={styles.formElem}>
                  <label>
                    Nom de scène <span>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.name}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Type d'artiste <span>*</span>
                  </label>
                  <Select
                    placeholder={profile.type}
                    styles={customStyles}
                    options={ArtistTypeOptions}
                    onChange={handleTypeChange}
                    value={ArtistTypeOptions.find(
                      (option) => option.value === type
                    )}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Genre(s)<span>*</span>
                  </label>
                  <Select
                    placeholder={profile.genres?.join(", ")}
                    isMulti
                    styles={customStyles}
                    options={genreOptions}
                    onChange={handleGenreChange}
                    value={genreOptions.filter((option) =>
                      genres.includes(option.value)
                    )}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Combien de musiciens comporte votre groupe ?</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.members}
                    onChange={(e) => setMembers(e.target.value)}
                    value={members}
                  />
                </div>
                {/*<div className={styles.formElem}>
                  <label>Medias</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.medias?.join(", ")}
                    onChange={(e) => setMedias(e.target.value.split(","))}
                    value={medias.join(", ")}
                  />
                    </div>*/}
                <div className={styles.formElem}>
                  <label>Photo de profil</label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*" // Limite le type de fichiers acceptés aux images
                    className={styles.input}
                    name="image"
                  />
                </div>
              </div>
              <div>
                {" "}
                {/* Right Column for Artist */}
                <span className={styles.exp}>Réseaux sociaux</span>
                <hr />
                <div className={styles.formElem}>
                  <label>Youtube</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.socials?.youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    value={youtube}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Facebook</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.socials?.facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    value={facebook}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>SoundCloud</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.socials?.souncloud}
                    onChange={(e) => setSoundcloud(e.target.value)}
                    value={souncloud}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Spotify</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.socials?.spotify}
                    onChange={(e) => setSpotify(e.target.value)}
                    value={spotify}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Deezer</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.socials?.deezer}
                    onChange={(e) => setDeezer(e.target.value)}
                    value={deezer}
                  />
                </div>
              </div>
            </>
          )}
          {isVenue && (
            <div>
              {" "}
              {/* Single Column for Venue */}
              <div className={styles.formElem}>
                <label>
                  Nom de l'établissement <span>*</span>
                </label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={profile?.name}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className={styles.formElem}>
                <label>
                  Adresse <span>*</span>
                </label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={profile.address}
                  onChange={(e) => setAdress(e.target.value)}
                  value={adress}
                />
              </div>
              <div className={styles.formElem}>
                <label>
                  Type d'établissement <span>*</span>
                </label>
                <Select
                  placeholder={profile.type}
                  styles={customStyles}
                  options={VenuTypeOptions}
                  onChange={handleVenueChange}
                  value={VenuTypeOptions.find(
                    (option) => option.value === venueType
                  )}
                />
              </div>
              <div className={styles.formElem}>
                <label>Description</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={profile.description}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className={styles.formElem}>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*" // Limite le type de fichiers acceptés aux images
                  className={styles.inputFile}
                  name="image"
                />
              </div>
            </div>
          )}
        </div>
        <button
          className={styles.btn}
          type="button"
          onClick={handleUpdateProfil}
        >
          Mettre à jour
        </button>
      </div>
    </Layout>
  );
}
