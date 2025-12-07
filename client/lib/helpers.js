const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
const coverCache = new Map(); 
const PLACEHOLDER_COVER = "/assets/bookCoverPlaceholder.jpg";

/**
 * Determines the appropriate headers to send in an HTTP request, given a
 * credential value.
 * @param {*} credentials An object that encapsulates a token as "t", or null.
 * @returns An object containing the appropraite headers for the HTTP request.
 */
const determineHeaders = (credentials) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (credentials?.t) {
    headers["Authorization"] = `Bearer ${credentials.t}`;
  }

  return headers;
};

const getCandidateUris = (links) => {
  if (!links) return [];

  return [
    links.extraLarge,
    links.large,
    links.medium,
    links.small,
    links.thumbnail,
    links.smallThumbnail,
  ].filter(Boolean);
};

/**
 * Returns the URI for a cover photo of a given book by retrieving it from the user's local storage
 * or fetching book data from the Google Books API.
 * @param {*} isbn The corresponding ISBN of the requested book cover.
 * @returns A URI of the book cover from the Books API or a path to the placeholder
 * image if no image URI is found.
 */
const fetchCoverUri = async (isbn) => {
  const cachedCover = localStorage.getItem(isbn);

  if (cachedCover) {
    //console.log(`Returning book "${isbn}" from the user's local storage.`)
    return cachedCover 
  }
  
  try {
    //console.log(`Fetching cover from URI: https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`)
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`
    );

    const data = await handleResponse(res);

    /* const links = data.items?.[0]?.volumeInfo?.imageLinks;
    const candidates = getCandidateUris(links);
    console.log(candidates); */

    const info = data.items?.[0]?.volumeInfo;
    let coverUri =
      info?.imageLinks?.large ||
      info?.imageLinks?.medium ||
      info?.imageLinks?.small ||
      info?.imageLinks?.thumbnail ||
      info?.imageLinks?.smallThumbnail ||
      PLACEHOLDER_COVER;
    //    let coverUri = info?.imageLinks?.medium || info?.imageLinks?.thumbnail || placeholderCover;

    if (coverUri && coverUri.includes("books.google.com")) {
      coverUri = coverUri.replace("&edge=curl", "");
    }

    const finalUri = normalizeUri(coverUri)
    localStorage.setItem(isbn, finalUri)
    return finalUri
  } catch (err) {
    handleError(err)
    return PLACEHOLDER_COVER;
  }
};

const handleError = (err) => {
  console.error("API request failed -", err);
  throw err;
};

/**
 * Silently swallows AbortErrors for console hygiene. 
 */
const handleResponse = async (res) => {
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    if (err.name !== "AbortError") { //Swallows AbortErrors for console 
      console.error("Failed to parse response as JSON", err);
      throw err;
    }
  }
};

const normalizeBook = async (raw) => {
  const coverUri = await fetchCoverUri(raw.isbn);

  return {
    ...raw,
    id: raw._id || raw.id,
    img: coverUri || raw.photoPath || "/assets/bookCoverPlaceholder.jpg",
  };
};

/**
 * Bypasses HTTPS mixed blocking.
 * @param {*} uri The URI of the image resource.
 * @returns An HTTPS version of the URI or the path for the placeholder cover.
 */
const normalizeUri = (uri) => {
  if (!uri) return PLACEHOLDER_COVER;
  return uri.replace(/^http:\/\//i, "https://");
};

export { determineHeaders, fetchCoverUri, handleError, normalizeBook, handleResponse };
