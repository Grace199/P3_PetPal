/*
 * ajax.js
 */

// Base URL of the FastAPI backend. Override via REACT_APP_API_URL if needed.
// (strip any trailing slash so domain + "/path/" never doubles up)
const domain = (process.env.REACT_APP_API_URL || "http://localhost:8000").replace(/\/+$/, "");

export async function ajax(url, settings) {
    return await fetch(domain + url, settings);
}

export async function ajax_or_login(url, settings, navigate) {
    const token = "Bearer " + localStorage.getItem('access');

    if ('headers' in settings) {
        settings.headers['Authorization'] = token;
    }
    else {
        settings['headers'] = {
            Authorization: token,
        }
    }

    const response = await ajax(url, settings);
    switch (response.status) {
        case 401:
        case 403:
            navigate('/login/');
            break;
        default:
            break;
    }

    return response;
}