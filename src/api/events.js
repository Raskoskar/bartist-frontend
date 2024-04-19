import moment from 'moment'


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
          hour_start: moment(hour_start._d).format('LT'),
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
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error during creation:", error.message);
    }
  };

  export const displayEvents = async (token) => {
    try {
      const response = await fetch(`http://localhost:3000/events/displayEvents/${token}`, {
      });
      const data = await response.json();
      console.log('data display event => ', data.event);
      return data.event;
    } catch (error) {
      console.error("Error during creation:", error.message);
    }
  };

  export const getEvents = async ()=> {
    try{
      const response = await fetch('http://localhost:3000/events', {
      });
      const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching events: ", error.message)
    }
  }

  export const deleteEvents = async () => {
    try{
      const response = await fetch('http://localhost:3000/events/deleteEvent/:_id', {
      });
      const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching events: ", error.message)
    }
  }

  export const updateStatus = async () => {
    try{
      const response = await fetch('http://localhost:3000/events/updateStatus/:status', {
      });
      const data = await response.json()
      return data;
    }catch(error){
      console.error("Error fetching events: ", error.message)
    }
  }