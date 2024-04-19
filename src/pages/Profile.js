import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import styles from "@/styles/Profil.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getProfile } from "@/hooks/getProfil";
import { updateArtist } from "@/api/artists";
import { updateProfilVenue } from "@/api/venues";
import genreOptions from "@/data/genres.json";
import { useRouter } from "next/router";

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
    getProfile(user.token, user.isVenue)
      .then((response) => {
        if (response.result) {
        setProfile(response);
        } else {
          console.log("error");
        }
      })
      
  }, []);

  // Gestion des selects

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
    console.log(genres.length > 1 ? genres : profile.genres);
    setGenres(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };
  const handleTypeChange = (selectedOptions) => {
    console.log("current selected type: ", selectedOptions.value);
    setType(selectedOptions.value);
  };
  const handleVenueChange = (selectedOptions) => {
    setVenueType(selectedOptions.value);
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
                    options={typeOptions}
                    onChange={handleTypeChange}
                    value={typeOptions.find((option) => option.value === type)}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Genre musical <span>*</span>
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
                  <label>Votre groupe comporte combien de musiciens ?</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.members}
                    onChange={(e) => setMembers(e.target.value)}
                    value={members}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Medias</label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.medias?.join(", ")}
                    onChange={(e) => setMedias(e.target.value.split(","))}
                    value={medias.join(", ")}
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
                  options={venueOptions}
                  onChange={handleVenueChange}
                  value={venueOptions.find(
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
