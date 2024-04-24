import Layout from "@/components/Layout";
import CardEvent from "@/components/cardEvent";
import styles from "../styles/Event.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { displayEvents, displayEventsByBooking } from "../api/events";
import { useRouter } from "next/router";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const token = useSelector((state) => state.user.value.token);
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  const getEvents = async () => {
    try {
      let data;
      if (user.isVenue) {
        data = await displayEvents(token);
      } else {
        data = await displayEventsByBooking(token);
        if (data) {
          data = data.events;
        }
      }
      if (data) {
        console.log(data)
        setEvents(data);
      }
    } catch (error) {
      setError("Erreur de récupération des événements. Réessayez plus tard.");
      console.error("error fetch dataEvent => ", error);
    } finally {
      setLoading(false); // On met loading à false dès que le fetch est terminé
    }
  };

  const handleClick = () => {
    user.isVenue ? router.push("/CreateEvent") : router.push("/Search");
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Mes évènements</span>
        </div>
        {/* Afficher le loading tant que tout n'est pas chargé*/}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.cardContainer}>
            {events.length > 0 ? (
              events.map((event) => (
                <CardEvent
                  event={user.isVenue ? event : event.event}
                  id={event._id}
                  key={event._id} 
                />
              ))
            ) : (
              <div className={styles.noEvent}>
                <span>Pas encore d'événements à afficher.</span>
                <button onClick={handleClick}>
                  {user.isVenue ? "Créer un événement" : "Chercher un événement"}
                </button>
              </div>
            )}
          </div>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </Layout>
  );
}

export default Events;
