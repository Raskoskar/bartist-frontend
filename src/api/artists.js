export const signUpArtist = async (email, password) => {
  try {
    const response = await fetch(`http://localhost:3000/artists/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const signInArtist = async (email, password) => {
  try {
    const response = await fetch(`http://localhost:3000/artists/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during sign in:", error.message);
  }
};

export const updateArtist = async (
  token,
  name,
  type,
  description,
  members,
  picture,
  genres,
  medias,
  youtube,
  soundcloud,
  facebook,
  deezer,
  spotify
) => {
  try {
    const response = await fetch(`http://localhost:3000/artists/createProfile/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        type: type,
        description: description,
        members: members,
        picture: picture,
        genres: genres,
        medias: medias,
        youtube: youtube,
        soundcloud: soundcloud,
        facebook: facebook,
        deezer: deezer,
        spotify: spotify,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during update:", error.message);
  }
};
