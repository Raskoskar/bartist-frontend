//FETCH signUp
export const signUpVenue = async (email, password) => {
    try{
        const response = await fetch(`http://localhost:3000/venues/signUp`, 
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
        const response = await fetch(`http://localhost:3000/venues/signIn`, 
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
        
        const response = await fetch(`http://localhost:3000/venues/createProfile/${token}`, 
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


export const getVenue = async (token) => {
    try{
      const response = await fetch(`http://localhost:3000/venues/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.venue
    }catch(error){
      console.error("Error retrieving venues infos:", error.message)
    }
  }