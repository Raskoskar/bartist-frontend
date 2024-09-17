import { useEffect, useState, useMemo } from "react";
import { getArtists } from "../api/artists";
import ArtistCard from "@/components/ArtistCard";
import styles from "@/styles/ArtistsSearch.module.css"; // Utiliser un fichier CSS spécifique
import ReactSelect from "react-select";
import genreOptions from "@/data/genres.json";
import { customStyles } from "@/styles/CustomSlect"; // Correction du nom du fichier
import { FaSearch } from "react-icons/fa"; // Pour ajouter une icône de recherche

export default function ArtistsSearch() {
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getArtists()
      .then((data) => {
        if (data && data.artists) {
          setArtists(data.artists);
        } else {
          setError(
            "Aucun artiste trouvé ou erreur de récupération de la liste des artistes."
          );
        }
      })
      .catch((error) => {
        setError("Échec de la récupération des artistes: " + error.message);
        console.error("Erreur API:", error);
      });
  }, []);

  const filteredArtists = useMemo(
    () =>
      artists.filter((artist) => {
        const nameMatch = artist?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const genreMatch =
          selectedGenres.length === 0 ||
          selectedGenres.some((genre) => artist.genres.includes(genre.value));
        return nameMatch && genreMatch;
      }),
    [artists, searchTerm, selectedGenres]
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <div className={styles.searchInput}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.input}
            type="text"
            placeholder="Chercher un artiste..."
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Chercher un artiste"
          />
        </div>
        <ReactSelect
          value={selectedGenres}
          onChange={setSelectedGenres}
          options={genreOptions}
          placeholder="Sélectionnez des genres"
          isClearable={true}
          isMulti={true}
          isSearchable={true}
          styles={customStyles}
          className={styles.select}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.list}>
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))
        ) : (
          <p className={styles.noArtists}>Aucun artiste trouvé.</p>
        )}
      </div>
    </div>
  );
}
