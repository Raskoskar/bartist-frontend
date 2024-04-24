import { getArtists } from "../api/artists";
import EventCardList from "@/components/EventCardList";
import styles from "@/styles/Search.module.css";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import genreOptions from "@/data/genres.json";
import { getEvents } from "@/api/events";
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';


export default function EventSearch() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // IL RECUPERE TOUT LES EVENTS
  useEffect(() => {
    getEvents().then((data) => {
      if (data && data.result) {
        setEvents(data.events);
      } else {
        console.log("No events found or error:", data.message);
        setEvents([]);
      }
    });
  }, []);

  // Permet de gérer les inputs utilisateurs et d'afficher les events en fonction
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date); // Assurez-vous que `event.date` existe et est dans un format compatible
    const searchMatch = event.title.toLowerCase().includes(searchTerm);
    const genreMatch = selectedGenres.length === 0 || selectedGenres.some(genreOption =>
      event.genres.includes(genreOption.value));
    const dateMatch = !selectedDate || eventDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
  
    return searchMatch && genreMatch && dateMatch;
  });
  
  
  return (
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
        <ReactDatePicker
  selected={selectedDate ? new Date(selectedDate) : null}
  onChange={(date) => setSelectedDate(date)}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select a date"
  className={styles.input}
  isClearable={true}
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
