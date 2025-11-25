const auth = {
    /**
     * Inserts a JWT token into the client browser's local storage. 
     * @param {*} jwt The JWT token to store.
     */
    authenticate(jwt) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('jwt', JSON.stringify(jwt));
        }
    },

    /**
     * Removes the JWT token from the client browser's local storage.
     */
    clearJwt() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    },

    /**
     * Determines if a user is authenticated by checking for a JWT token in their 
     * browser's local storage.
     * @returns True if the user is authenticated, false otherwise.
     */
    isAuthenticated() {
        const jwt = localStorage.getItem('jwt')

        if (typeof window != 'undefined'
            && jwt
            && jwt != 'undefined') {
            return JSON.parse(jwt);
        }
        else {
            return false;
        }
    }
    ,
    /** Store user object in local storage for quick access on the client */
    setUser(user) {
        if (typeof window !== 'undefined' && user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    },

    /** Retrieve stored user object from local storage */
    getUser() {
        if (typeof window !== 'undefined') {
            const u = localStorage.getItem('user')
            return u ? JSON.parse(u) : null
        }
        return null
    }
}

export default auth 