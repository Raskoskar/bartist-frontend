// Fonction de liaison vers le backend et de controle des données de l'utilisateur pour
// l'inscription d'un nouvel utilisateur
export const signUpArtist = async (email, password) => {
  try {
    const response = await fetch(`bartist-backend.vercel.app/artists/signUp`, {
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

// Fonction de liaison vers le backend et de controle des données de l'utilisateur pour
// la connnexion d'un utilisateur
export const signInArtist = async (email, password) => {
  try {
    const response = await fetch(`bartist-backend.vercel.app/artists/signIn`, {
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

// Fonction de liaison vers le backend et de controle des données de l'utilisateur pour
// la mise à jour d'un profil utilisateur.
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
    const response = await fetch(
      `http://localhost:3000/artists/createProfile/${token}`,
      {
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
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during update:", error.message);
  }
};

// Fonction de liaison vers le backend et de controle des données pour récupérer les données sur un artiste.
export const getArtist = async (token) => {
  try {
    const response = await fetch(`http://localhost:3000/artists/token/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.artist;
  } catch (error) {
    console.error("Error retrieving artist infos:", error.message);
  }
};

export const getArtists = async () => {
  try {
    const response = await fetch(`http://localhost:3000/artists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (data) {
      return data;
    } else {
      return (data = { message: "error" });
    }
  } catch (error) {
    console.error("Error retrieving artists:", error.message);
  }
};

export const getArtistById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/artists/id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching an artist: ", error.message);
  }
};
