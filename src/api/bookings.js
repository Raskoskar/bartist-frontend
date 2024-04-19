

// Fonction de liaison vers le backend pour l'affichage des bookings'
export const displayAllBookings = async (token, isVenue) => {
    try {
        console.log(token)
        console.log(isVenue)
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
export const updateBookingStatus = async (token, isVenue, status) => {
    try {
      const response = await fetch(`http://localhost:3000/bookings/updateBookingStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during booking update", error.message);
    }
  };