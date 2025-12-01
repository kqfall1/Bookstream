const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
const placeholderCover = "/assets/bookCoverPlaceholder.jpg"

/**
 * Determines the appropriate headers to send in an HTTP request, given a 
 * credential value. 
 * @param {*} credentials An object that encapsulates a token as "t", or null. 
 * @returns An object containing the appropraite headers for the HTTP request.
 */
const determineHeaders = (credentials) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (credentials?.t) {
        headers['Authorization'] = `Bearer ${credentials.t}`
    }

    return headers
}

/**
 * Returns the URI for a cover photo of a given book by fetching book data
 * from the Google Books API.
 * @param {*} isbn The corresponding ISBN of the requested book cover. 
 * @returns A URI of the book cover from the Books API or a path to the placeholder
 * image if no image URI is found. 
 */
const fetchCoverUri = async (isbn) => {
    try {
        //console.log(`Fetching cover from URI: https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`)
        const res = await fetch (`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`)
        const data = await handleResponse(res)
        const info = data.items?.[0]?.volumeInfo;
        const coverUri =
            info?.imageLinks?.thumbnail ||
            info?.imageLinks?.smallThumbnail || 
            placeholderCover
        return normalizeUrl(coverUri);
    } catch (err) {
        console.error("Cover fetch failed:", err);
        return placeholderCover;
    }
}

const handleError = (err) => {
    console.error("API request failed", err);
    throw err; 
}

const handleResponse = async (res) => {
    try {
        const data = await res.json(); 
        return data; 
    }
    catch (err) {
        console.error("Failed to parse response as JSON", err);
        throw err; 
    } 
}

const normalizeBook = async (raw) => {
  const coverUri = await fetchCoverUri(raw.isbn);

  return {
    ...raw,
    id: raw._id || raw.id,
    img: coverUri || raw.photoPath || "/assets/bookCoverPlaceholder.jpg"
  };
} 

/**
 * Bypasses HTTPS mixed blocking. 
 * @param {*} uri The URI of the image resource.
 * @returns An HTTPS version of the URI or the path for the placeholder cover.
 */
const normalizeUrl = (uri) => {
  if (!uri) return placeholderCover;
  return uri.replace(/^http:\/\//i, "https://");
};

export { determineHeaders, fetchCoverUri, handleError, normalizeBook, handleResponse }