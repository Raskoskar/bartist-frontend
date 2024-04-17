
export const createEvent = async (
    token,
    title,
    description,
    date,
    hour_start,
    picture,
    genres,
    status,
    facebook,
    instagram,
  ) => {
    try {
      const response = await fetch(`http://localhost:3000/artists/createEvent/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          date: date,
          hour_start: hour_start,
          picture: picture,
          genres: genres,
          status: status,
          facebook: facebook,
          instagram: instagram,
          genres: genres,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during creation:", error.message);
    }
  };