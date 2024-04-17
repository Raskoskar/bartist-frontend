import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import styles from "@/styles/Profil.module.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import { getProfile } from "@/hooks/getProfil";
import { updateArtist } from "@/api/artists";
import { updateProfilVenue } from "@/api/venues";

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
  // Récupération des informations utilisateurs en BDD :
  useEffect(() => {
    getProfile(user.token, user.isVenue).then((response) =>
      setProfile(response)
    )
  },[type, genres, venueType]);


  // Gestion des selects
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
    console.log(genres.length > 1 ? genres : profile.genres)
    setGenres(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };
  const handleTypeChange =  (selectedOptions) => {
    console.log("current selected type: ",selectedOptions.value)
    setType(selectedOptions.value);
    
  };
  const handleVenueChange = (selectedOptions) => {
    setVenueType(selectedOptions.value);
  };

  // Fonction de mise à jour du profil utilisateur:
  const handleUpdateProfil = async () => {
    let data = null
    if (!isVenue){
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
    } else{
       data = await updateProfilVenue(
        user.token,
        name != "" ? name : profile.name,
        adress != "" ? adress : profile.adress,
        venueType != "" ? venueType : profile.type,
        description != "" ? description : profile.description,
        picture != "" ? picture : profile.picture,
      )
    }
    console.log(data)
    if(data.result){
      console.log(data.result)
    }else{
      console.error(data.error)
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
              <image alt="profil"></image>
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
                placeholder={profile.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                placeholder={profile.description}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            {isVenue ? (
              <>
                <div className={styles.formElem}>
                  <label>
                    Adress <span>*</span>
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
                    value={venueOptions.find(option => option.value === venueType)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.formElem}>
                  <label>Type d'artiste</label>
                  <Select
                  placeholder={profile.type}
                    styles={customStyles}
                    options={typeOptions}
                    onChange={handleTypeChange}
                    value={typeOptions.find(option => option.value === type)}
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
                    value={genreOptions.find(option => option.value === genres)}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Votre groupe comporte combien de musiciens ? <span>*</span>
                  </label>
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
                    placeholder={profile.media}
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
                      placeholder={profile.socials?.youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      value={youtube}
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
                    <label>SoundCloud</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder={profile.socials?.soundcloud}
                      onChange={(e) => setSoundcloud(e.target.value)}
                      value={souncloud}
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
                </>
              </>
            )}
            <button type="button" onClick={() => handleUpdateProfil()}>Mettre à jour</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
