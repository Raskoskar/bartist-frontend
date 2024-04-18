// Fonction de liaison vers le backend pour l'affichage des bookings'
export const displayAllBookings = async (token, isVenue) => {
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