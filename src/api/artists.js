export const signUpArtist = async (email, password) => {
    try{
        const response = await fetch(`http://localhost:3000/artists/signUp`, 
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
export const signInArtist = async (email, password) => {
    try{
        const response = await fetch(`http://localhost:3000/artists/signIn`, 
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