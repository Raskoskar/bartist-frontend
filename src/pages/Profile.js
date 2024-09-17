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
import { customStyles } from "@/styles/CustomSlect";
import ArtistTypeOptions from "@/data/artistType";
import VenueTypeOptions from "@/data/venueType";
import { uploadFile } from "@/api/upload";

export default function Profile() {
  // Variables d'état
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [genres, setGenres] = useState([]);
  const [members, setMembers] = useState("");
  const [picture, setPicture] = useState("");
  const [youtube, setYoutube] = useState("");
  const [facebook, setFacebook] = useState("");
  const [deezer, setDeezer] = useState("");
  const [spotify, setSpotify] = useState("");
  const [soundcloud, setSoundcloud] = useState("");
  const [address, setAddress] = useState("");
  const [venueType, setVenueType] = useState("");
  const [profile, setProfile] = useState({});

  // Savoir si l'utilisateur est un artiste ou un établissement
  const user = useSelector((state) => state.user.value);
  const isVenue = user.isVenue;
  const router = useRouter();

  // Récupération des informations utilisateur
  useEffect(() => {
    getProfile(user.token, user.isVenue).then((response) => {
      if (!isVenue) {
        setProfile(response);
      } else if (isVenue) {
        setProfile(response.venue);
      } else {
        console.error("Erreur lors de la récupération du profil");
      }
    });
  }, [user, isVenue]);

  // Gestion des changements de sélection
  const handleGenreChange = (selectedOptions) => {
    setGenres(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const handleTypeChange = (selectedOption) => {
    setType(selectedOption ? selectedOption.value : "");
  };

  const handleVenueChange = (selectedOption) => {
    setVenueType(selectedOption ? selectedOption.value : "");
  };

  const handleFileUpload = async (event) => {
    const data = await uploadFile(event);
    setPicture(data.imageUrl);
  };

  // Mise à jour du profil utilisateur
  const handleUpdateProfile = async () => {
    let data = null;
    if (!isVenue) {
      data = await updateArtist(
        user.token,
        name || profile.name,
        type || profile.type,
        description || profile.description,
        members || profile.members,
        picture || profile.picture,
        genres.length > 0 ? genres : profile.genres,
        profile.medias,
        youtube || profile.socials?.youtube,
        soundcloud || profile.socials?.soundcloud,
        facebook || profile.socials?.facebook,
        deezer || profile.socials?.deezer,
        spotify || profile.socials?.spotify
      );
    } else {
      data = await updateProfilVenue(
        user.token,
        name || profile.name,
        address || profile.address,
        venueType || profile.type,
        description || profile.description,
        picture || profile.picture
      );
    }
    if (data.result) {
      router.reload();
    } else {
      console.error(data.error);
    }
  };

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Mon Profil {isVenue ? "Établissement" : "Artiste"}
          </h1>
        </div>
        <div
          className={`${styles.formContainer} ${
            !isVenue ? styles.twoColumns : ""
          }`}
        >
          {!isVenue && (
            <>
              <div>
                <h2 className={styles.exp}>Informations générales</h2>
                <hr />
                <div className={styles.formElem}>
                  <label>
                    Nom de scène <span>*</span>
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={profile.name || "Votre nom de scène"}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>
                    Type d'artiste <span>*</span>
                  </label>
                  <Select
                    placeholder={profile.type || "Sélectionnez un type"}
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
                    Genre(s) <span>*</span>
                  </label>
                  <Select
                    placeholder={
                      profile.genres?.join(", ") || "Sélectionnez des genres"
                    }
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
                  <label>Nombre de musiciens</label>
                  <input
                    className={styles.input}
                    type="number"
                    placeholder={profile.members || "Nombre de membres"}
                    onChange={(e) => setMembers(e.target.value)}
                    value={members}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Photo de profil</label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className={styles.inputFile}
                    name="image"
                  />
                </div>
              </div>
              <div>
                <h2 className={styles.exp}>Réseaux sociaux</h2>
                <hr />
                <div className={styles.formElem}>
                  <label>Youtube</label>
                  <input
                    className={styles.input}
                    type="url"
                    placeholder={profile.socials?.youtube || "Lien Youtube"}
                    onChange={(e) => setYoutube(e.target.value)}
                    value={youtube}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Facebook</label>
                  <input
                    className={styles.input}
                    type="url"
                    placeholder={profile.socials?.facebook || "Lien Facebook"}
                    onChange={(e) => setFacebook(e.target.value)}
                    value={facebook}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>SoundCloud</label>
                  <input
                    className={styles.input}
                    type="url"
                    placeholder={
                      profile.socials?.soundcloud || "Lien SoundCloud"
                    }
                    onChange={(e) => setSoundcloud(e.target.value)}
                    value={soundcloud}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Spotify</label>
                  <input
                    className={styles.input}
                    type="url"
                    placeholder={profile.socials?.spotify || "Lien Spotify"}
                    onChange={(e) => setSpotify(e.target.value)}
                    value={spotify}
                  />
                </div>
                <div className={styles.formElem}>
                  <label>Deezer</label>
                  <input
                    className={styles.input}
                    type="url"
                    placeholder={profile.socials?.deezer || "Lien Deezer"}
                    onChange={(e) => setDeezer(e.target.value)}
                    value={deezer}
                  />
                </div>
              </div>
            </>
          )}
          {isVenue && (
            <div>
              <h2 className={styles.exp}>Informations de l'établissement</h2>
              <hr />
              <div className={styles.formElem}>
                <label>
                  Nom de l'établissement <span>*</span>
                </label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={profile.name || "Nom de l'établissement"}
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
                  placeholder={profile.address || "Adresse"}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              <div className={styles.formElem}>
                <label>
                  Type d'établissement <span>*</span>
                </label>
                <Select
                  placeholder={profile.type || "Sélectionnez un type"}
                  styles={customStyles}
                  options={VenueTypeOptions}
                  onChange={handleVenueChange}
                  value={VenueTypeOptions.find(
                    (option) => option.value === venueType
                  )}
                />
              </div>
              <div className={styles.formElem}>
                <label>Description</label>
                <textarea
                  className={styles.input}
                  placeholder={profile.description || "Description"}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className={styles.formElem}>
                <label>Photo de l'établissement</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
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
          onClick={handleUpdateProfile}
        >
          Mettre à jour
        </button>
      </div>
    </Layout>
  );
}
