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