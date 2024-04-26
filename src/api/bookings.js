import moment from "moment"
// Fonction de liaison vers le backend pour l'affichage des bookings'
export const createBooking = async (
  token,
  isVenue,
  artistId,
  venueId,
  eventId,
  hour_start,
  duration,
  rate,
  status,
  description
) => {
  try {
    const response = await fetch(
      `bartist-backend.vercel.app/bookings/createBooking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          isVenue,
          artistId,
          venueId,
          eventId,
          hour_start: moment(hour_start._d).format("LT"),
          duration,
          rate,
          status,
          description,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during display bookings:", error.message);
  }
};

export const displayBookings = async (token, isVenue) => {
  try {
    const response = await fetch(
      `bartist-backend.vercel.app/bookings/displayAllBookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, isVenue: isVenue }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during display bookings:", error.message);
  }
};

// Fonction de liaison vers le backend pour le changement de statut d'un booking'
export const updateBookingStatus = async (id, status) => {
  try {
    const response = await fetch(
      `bartist-backend.vercel.app/bookings/updateBookingStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, status: status }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during booking update", error.message);
  }
};


export const getBookingByEventId = async (id) => {
  try{
    const response = await fetch(
      `bartist-backend.vercel.app/bookings/id/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }catch(error){
    console.error("Error during get booking by event id", error.message);
  }
}