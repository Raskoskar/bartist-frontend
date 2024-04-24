import { useEffect, useState, useMemo } from "react";
import PropTypes from 'prop-types';
import { getArtists } from "../api/artists";
import ArtistCard from "@/components/ArtistCard";
import styles from "@/styles/Search.module.css";
import ReactSelect from "react-select";
import genreOptions from "@/data/genres.json";
import { customStyles } from "@/styles/CustomSlect";

export default function ArtistsSearch() {
    const [artists, setArtists] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getArtists().then(data => {
            if (data && data.artists) {
                setArtists(data.artists);
            } else {
                setError("Aucun artiste trouvé ou erreur de récupération de la liste des artistes.");
            }
        }).catch(error => {
            setError("Échec de la récupération des artistes: " + error.message);
            console.error("Erreur API:", error);
        });
    }, []);

    const filteredArtists = useMemo(() => artists.filter(artist => {
        const nameMatch = artist?.name?.toLowerCase().includes(searchTerm);
        const genreMatch = selectedGenres.length === 0 || selectedGenres.some(genre =>
            artist.genres.includes(genre.value)
        );
        return nameMatch && genreMatch;
    }), [artists, searchTerm, selectedGenres]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    return (
        <>
            <input
                className={styles.input}
                type="text"
                placeholder="Rechercher un artiste..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Chercher un artiste"
            />
            <div className={styles.filters}>
                <ReactSelect
                    value={selectedGenres}
                    onChange={setSelectedGenres}
                    options={genreOptions}
                    placeholder="Sélectionnez des genres"
                    isClearable={true}
                    isMulti={true}
                    isSearchable={true}
                    styles={customStyles}
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {filteredArtists.length > 0 ? (
                filteredArtists.map((artist) => (
                    <ArtistCard key={artist._id} artist={artist} />
                ))
            ) : (
                <p className={styles.noArtists}>Aucun artiste trouvé.</p>
            )}
        </>
    );
}
