const placeholderCover = "/assets/bookCoverPlaceholder.jpg";
const buildOpenLibraryCover = (isbn) => {
  if (!isbn) return placeholderCover;
  const cleanIsbn = isbn.replace(/-/g, "");
  return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
};

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

const fetchCoverUri = async (isbn) => buildOpenLibraryCover(isbn);

const handleError = (err) => {
  console.error("API request failed", err);
  throw err;
};

const handleResponse = async (res) => {
  try {
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to parse response as JSON", err);
    throw err;
  }
};

const normalizeBook = async (raw) => {
  const existingPath = (raw.photoPath || "").trim();
  const usesGoogleThumb = existingPath.includes("books.google.com");
  const coverUri = (!usesGoogleThumb && existingPath)
    ? normalizeUrl(existingPath)
    : buildOpenLibraryCover(raw.isbn);

  return {
    ...raw,
    id: raw._id || raw.id,
    img: coverUri || "/assets/bookCoverPlaceholder.jpg",
  };
};

/**
 * Bypasses HTTPS mixed blocking.
 * @param {*} uri The URI of the image resource.
 * @returns An HTTPS version of the URI or the path for the placeholder cover.
 */
const normalizeUrl = (uri) => {
  if (!uri) return placeholderCover;
  return uri.replace(/^http:\/\//i, "https://");
};

export { determineHeaders, fetchCoverUri, handleError, normalizeBook, handleResponse };
