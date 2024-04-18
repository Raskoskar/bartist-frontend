
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
      const response = await fetch(`http://localhost:3000/events/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
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
      console.log('data create event => ', data);
      return data;
    } catch (error) {
      console.error("Error during creation:", error.message);
    }
  };

  export const displayEvent = async (token) => {
    try {
      const response = await fetch(`http://localhost:3000/events/displayEvent/${token}`, {
      });
      const data = await response.json();
      console.log('data display event => ', data.event);
      return data.event;
    } catch (error) {
      console.error("Error during creation:", error.message);
    }
  };