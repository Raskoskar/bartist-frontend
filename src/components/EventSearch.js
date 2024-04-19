import { getArtists } from "../api/artists";
import EventCardList from "@/components/EventCardList";
import styles from "@/styles/Search.module.css";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import genreOptions from "@/data/genres.json";
import { getEvents } from "@/api/events";

export default function EventSearch() {

    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDate, setSelectedDate] = useState("")

    // IL RECUPERE TOUT LES ARTISTES
    useEffect(() => {
        getEvents().then(data => {
            if (data && data.result) {
                setEvents(data.events)
            } else {
                console.log("No events found or error:", data.message);
                setEvents([]);
            }
        })
    }, []);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm) &&
        (selectedGenres.length === 0 || selectedGenres.some(genreOption => 
            event.genres.includes(genreOption.value))
        )
    );
  return(
    <>
      <input
        className={styles.input}
        type="text"
        placeholder="Rechercher un event..."
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
          styles={{ container: (base) => ({ ...base, marginBottom: "20px" }) }}
        />
      </div>

      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventCardList key={event._id} event={event} />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </>
  );
}
