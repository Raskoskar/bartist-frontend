

// Fonction de liaison vers le backend pour l'affichage des bookings'
export const createBooking = async (isVenue, token, eventId, tokenOtherUser, date, description, status, duration, hour_start, rate) => {
  try {
    const response = await fetch(`http://localhost:3000/bookings/createBooking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({isVenue, token, eventId, tokenOtherUser, date, description, status, duration, hour_start, rate}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during display bookings:", error.message);
  }
};


export const displayBookings = async (token, isVenue) => {
    try {
      const response = await fetch(`http://localhost:3000/bookings/displayAllBookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, isVenue: isVenue }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during display bookings:", error.message);
    }
  };

  // Fonction de liaison vers le backend pour le changement de statut d'un booking'
export const updateBookingStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:3000/bookings/updateBookingStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, status: status}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during booking update", error.message);
    }
  };