import { getArtists } from "../api/artists";
import EventCardList from "@/components/EventCardList";
import styles from "@/styles/Search.module.css";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import genreOptions from "@/data/genres.json";
import { getEvents } from "@/api/events";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { customStyles } from "@/styles/CustomSlect";

export default function EventSearch() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // IL RECUPERE TOUT LES EVENTS
  useEffect(() => {
    getEvents().then((data) => {
      if (data && data.events) {
        setEvents(data.events);
      } else {
        console.error("Aucun event trouvé ou erreur:", data.message);
        setEvents([]);
      }
    }).catch(error => {
      console.error("Error fetching events:", error);
    });
  }, []);

  // Permet de gérer les inputs utilisateurs et d'afficher les events en fonction
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredEvents = useMemo(() => events.filter(event => {
    const eventDate = new Date(event.date);
    const searchMatch = event.title.toLowerCase().includes(searchTerm);
    const genreMatch = selectedGenres.length === 0 || selectedGenres.some(genre => event.genres.includes(genre.value));
    const dateMatch = !selectedDate || eventDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
    return searchMatch && genreMatch && dateMatch;
  }), [events, searchTerm, selectedGenres, selectedDate]);

  return (
    <>
      <label htmlFor="search-input" className={styles.label}>Rechercher un événement :</label>
      <input
        id="search-input"
        className={styles.input}
        type="text"
        placeholder="Rechercher un événement..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className={styles.filters}>
        <Select
          value={selectedGenres}
          onChange={setSelectedGenres}
          options={genreOptions}
          placeholder="Sélectionner des genres"
          isClearable={true}
          isMulti={true}
          isSearchable={true}
          styles={customStyles}
        />
        <ReactDatePicker
          selected={selectedDate ? new Date(selectedDate) : null}
          onChange={setSelectedDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="Sélectionner une date"
          className={styles.input}
          isClearable={true}
        />
      </div>
      {filteredEvents.length > 0 ? (
        filteredEvents.map(event => <EventCardList key={event._id} event={event} />)
      ) : (
        <p>Aucun événement trouvé.</p>
      )}
    </>
  );
}