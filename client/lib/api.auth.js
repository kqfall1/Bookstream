import auth from './auth.helpers.js'
import { handleError, handleResponse } from './helpers.js';

/**
 * Signs a user into their account if the credentials they enter are correct.
 * @param {*} credentials An object with the fields needed to sign in. 
 * @returns An object representing the authenticated user alongside a JWT token for 
 * the user's current session. 
 * @throws An error if the credentials are invalid. 
 */
const signIn = async (credentials) => {
    try {
        const res = await fetch(`/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        //console.log(res)
        const data = await handleResponse(res);

        if (res.ok && typeof data?.token === 'string') {
            auth.authenticate(data.token)
        }

        console.log(data)
        return data
    }
    catch (err) {
        return handleError(err);
    } 
}

/**
 * Signs a user out of their account. 
 * @returns A string indicating success or failure. 
 * @throws An error if the sign out process was unsuccessful.
 */
const signOut = async () => {
    if (auth.isAuthenticated()) {
        try {
            const res = await fetch(`/api/auth/signout`, {method: 'GET'}) 

            //console.log(res)
            const data = await handleResponse(res)

            if (res.ok) {
                auth.clearJwt()
                window.alert("Successfully signed out.")
            }

            //console.log(data)
            return data
        } 
        catch (err) {
            return handleError(err);
        }
    }
}     

export { signIn, signOut }