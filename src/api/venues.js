//FETCH signUp
export const signUpVenue = async (email, password) => {
    try{
        const response = await fetch(`bartist-backend.vercel.app/venues/signUp`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
//FETCH signIn
export const signInVenue = async (email, password) => {
    try{
        const response = await fetch(`bartist-backend.vercel.app/venues/signIn`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: password })
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error during sign in:", error.message);
    }
}

//FETCH create profil
export const updateProfilVenue = async ( 
    token, name, address, type, description, picture) => {
        
    try{
        
        const response = await fetch(`bartist-backend.vercel.app/venues/createProfile/${token}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, address: address, type: type, description: description, picture: picture })
      
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error during update profil:", error.message);
    }

}

// FONCTION DE RECUPERATION D'UN ETABLISSEMENT EN FONCTION DE SON OBJECT ID
export const getVenueById = async (id) => {
    try{
      const response = await fetch(`bartist-backend.vercel.app/venues/id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data
    }catch(error){
      console.error("Error retrieving venues infos:", error.message)
    }
  }

  export const getVenueByToken = async (token) => {
    try{
      const response = await fetch(`bartist-backend.vercel.app/venues/token/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data
    }catch(error){
      console.error("Error retrieving venues infos:", error.message)
    }
  }