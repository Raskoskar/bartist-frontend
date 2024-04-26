import moment from "moment";

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
  instagram
) => {
  try {
    const response = await fetch(`bartist-backend.vercel.app/events/createEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: title,
        description: description,
        date: date,
        hour_start: moment(hour_start._d).format("LT"),
        picture: picture,
        genres: genres,
        status: status,
        facebook: facebook,
        instagram: instagram,
        genres: genres,
      }),
    });
    const data = await response.json();
    console.log("data create event => ", data);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during creation:", error.message);
  }
};

export const displayEvents = async (token) => {
  try {
    const response = await fetch(
      `bartist-backend.vercel.app/events/displayEvents/${token}`,
      {}
    );
    const data = await response.json();
    return data.event;
  } catch (error) {
    console.error("Error during creation:", error.message);
  }
};

export const getEvents = async () => {
  try {
    const response = await fetch("bartist-backend.vercel.app/events", {});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events: ", error.message);
  }
};

  export const deleteEvents = async (_id) => {
    try{
      const response = await fetch(`bartist-backend.vercel.app/events/deleteEvent`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: _id,
    }),
  });
  const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching events: ", error.message)
    }
  }


  export const updateEventStatus = async (status, id) => {
    try{
      const response = await fetch('bartist-backend.vercel.app/events/updateEventStatus', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, status: status}),
      });
      const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching events: ", error.message)
    }
  }

  export const getEventById = async (id) => {
    try{
      const response = await fetch(`bartist-backend.vercel.app/events/id/${id}`,
      )
      const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching an event by Id: ", error.message)
    }
  }

  export const getEventsByVenueToken = async (token) =>
  {
    try{
      const response = await fetch(`bartist-backend.vercel.app/events/getEventsByVenueToken/${token}`,
      )
      const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching events by venue token: ", error.message)
    }
  }


  export const displayEventsByBooking = async (token) => {
    try{
      const response = await fetch(
        `bartist-backend.vercel.app/events/token/${token}`
      )
      const  data = await response.json()
      return data
    }catch(error){
      console.error("Error fetching events by artist token: ", error.message)
    }
  }
  
