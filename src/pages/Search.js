import { getArtists } from "../api/artists";
import ArtistCard from "@/components/ArtistCard";
import Layout from "@/components/Layout";
import styles from "@/styles/Search.module.css";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import genreOptions from "@/data/genres.json";

export default function Search() {
    const [artists, setArtists] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(() => {
        getArtists().then(data => {
            if (data && data.result) {
                setArtists(data.artists);
            } else {
                console.log("No artists found or error:", data.message);
                setArtists([]);
            }
        });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm) &&
        (selectedGenres.length === 0 || selectedGenres.some(genreOption => 
            artist.genres.includes(genreOption.value))
        )
    );
    
    return (
        <Layout>
            <div className={styles.mainContent}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Rechercher un artiste..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className={styles.filters}>
                    <ReactSelect
                        value={selectedGenres}
                        onChange={setSelectedGenres}
                        options={genreOptions}
                        placeholder="Select genres"
                        isClearable={true}
                        isMulti={true}
                        isSearchable={true}
                        styles={{ container: (base) => ({ ...base, marginBottom: '20px' }) }}
                    />
                </div>
                
                {filteredArtists.length > 0 ? (
                    filteredArtists.map((artist) => <ArtistCard key={artist._id} artist={artist} />)
                ) : (
                    <p>No artists found.</p>
                )}
            </div>
        </Layout>
    );
}
