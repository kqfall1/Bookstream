import { determineHeaders, handleResponse, handleError } from './helpers.js';

/**
 * Creates a new resource by sending a POST request to the specified API route.
 * @param {*} apiRoute The route to the API. Must include a trailing slash. 
 * @param {*} credentials An object with authentication credential fields. Pass null 
 * if no authentication is needed.
 * @param {*} obj An object with the fields needed to create the resource.
 * @returns A JSON object representing the created resource. 
 * @throws An error if the request fails or the response cannot be parsed as JSON.
 */
const create = async (apiRoute, credentials, obj) => {
    const headers = determineHeaders(credentials)
    
    try {
        const res = await fetch(apiRoute, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(obj)
        })

        //console.log(res)
        return await handleResponse(res)
    }
    catch (err) {
        return handleError(err)
    } 
}

/**
 * Retrieves a list of resources from the specified API route by sending a GET request.
 * @param {*} apiRoute The route to the API. Must include a trailing slash.
 * @param {*} signal An AbortSignal to cancel the request if needed.
 * @returns A list of resources in JSON format.
 * @throws An error if the request fails.
 */
const list = async (apiRoute, signal) => {
    try {
        const res = await fetch(apiRoute, {
            method: 'GET',
            signal: signal
        }); 

        //console.log(res)
        return await handleResponse(res);
    }
    catch (err) {
        if (err.name === "AbortError") {
            return [];
        }
        else {
            return handleError(err);
        }
    }
}

/**
 * Retrieves a specific resource by its ID from the specified API route by sending a GET request.
 * @param {*} apiRoute The route to the API. Must include a trailing slash.
 * @param {*} credentials An object with authentication credential fields.
 * @param {*} id The ID of the resource to retrieve.
 * @param {*} signal An AbortSignal to cancel the request if needed.
 * @returns A JSON object representing the requested resource.
 * @throws An error if the request fails.
 */
const read = async (apiRoute, credentials, id, signal) => {
    const headers = determineHeaders(credentials)
    
    try {
        const res = await fetch(`${apiRoute}${id}`, {
            method: 'GET',
            signal: signal,
            headers: headers
        })

        return await handleResponse(res);
    }
    catch (err) {
        return handleError(err);
    }
}

/**
 * Deletes a specific resource by its ID from the specified API route by sending a DELETE request.
 * @param {*} apiRoute The route to the API. Must include a trailing slash.
 * @param {*} credentials An object with authentication credential fields.
 * @param {*} id The ID of the resource to delete.
 * @returns A JSON object representing the deleted resource.
 * @throws An error if the request fails.
 */
const remove = async (apiRoute, credentials, id) => {
    const headers = determineHeaders(credentials)
    
    try {
        const res = await fetch(`${apiRoute}${id}`, {
            method: 'DELETE',
            headers: headers
        }) 

        return await handleResponse(res)
    }
    catch (err) {
        return handleError(err)
    }
}

/**
 * Updates a specified resource by its ID at the specified API route by sending a PUT request.
 * @param {*} credentials An object with authentication credential fields.
 * @param {*} id The ID of the resource to update.
 * @param {*} obj An object with the updated fields for the resource.
 * @returns The updated resource in JSON format.
 * @throws An error if the request fails.
 */
const update = async (apiRoute, credentials, id, obj) => {
    const headers = determineHeaders(credentials)
    
    try {
        const res = await fetch(`${apiRoute}${id}`, {
            method: 'PUT',
            headers: headers, 
            body: JSON.stringify(obj)
        })

        return await handleResponse(res)
    }
    catch (err) {
        return handleError(err)
    }
}

export { create, list, read, remove, update }  