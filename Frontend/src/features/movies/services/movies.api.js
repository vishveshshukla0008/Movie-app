import axios from "axios"

const API_KEY = '1cbabe9a26deebb9ff64ebd064a81c24';
const BASE_URL = "https://api.themoviedb.org/3"

const api = axios.create({
    baseURL: BASE_URL
})


// Trending Movies
export const getTrendingMovies = async () => {
    try {
        const res = await api.get("/trending/movie/day", {
            params: { api_key: API_KEY }
        })

        return res.data.results

    } catch (error) {
        console.error("Trending Movies API error:", error.message)
        return []
    }
}


// Trending TV Shows
export const getTrendingShows = async () => {
    try {
        const res = await api.get("/trending/tv/day", {
            params: { api_key: API_KEY }
        })

        return res.data.results

    } catch (error) {
        console.error("Trending Shows API error:", error.message)
        return []
    }
}


// Popular Movies
export const getMovies = async (page = 1) => {
    try {
        const res = await api.get("/movie/popular", {
            params: {
                api_key: API_KEY,
                page
            }
        })

        // return the full payload so callers can access paging info
        return res.data

    } catch (error) {
        console.error("Movies API error:", error.message)
        return { results: [], page, total_pages: 0 }
    }
}


// Popular TV Shows
export const getTVShows = async (page = 1) => {
    try {
        const res = await api.get("/tv/popular", {
            params: {
                api_key: API_KEY,
                page
            }
        })

        // return the full payload so callers can access paging info
        return res.data

    } catch (error) {
        console.error("TV Shows API error:", error.message)
        return { results: [], page, total_pages: 0 }
    }
}


// Search Movies & TV
export const searchContent = async (query) => {
    try {
        const res = await api.get("/search/multi", {
            params: {
                api_key: API_KEY,
                query
            }
        })

        return res.data.results

    } catch (error) {
        console.error("Search API error:", error.message)
        return []
    }
}


// Movie Details
export const getMovieDetails = async (id) => {
    try {
        const res = await api.get(`/movie/${id}`, {
            params: { api_key: API_KEY }
        })

        return res.data

    } catch (error) {
        console.error("Movie details error:", error.message)
        return null
    }
}


// Movie Trailer
export const getMovieTrailer = async (id) => {
    try {
        const res = await api.get(`/movie/${id}/videos`, {
            params: { api_key: API_KEY }
        })

        return res.data.results

    } catch (error) {
        console.error("Trailer API error:", error.message)
        return []
    }
}

export const getSingleTvShowDetails = async (id) => {
    try {
        const res = await api.get(`/tv/${id}`, {
            params: { api_key: API_KEY }
        })

        console.log(res.data)

        return res.data

    } catch (error) {
        console.error("TV Show details error:", error.message)
    }
}


// TV Show Trailer
export const getTvShowTrailer = async (id) => {
    try {
        console.log("Fetching trailer for TV show ID:", id)
        const res = await api.get(`/tv/${id}/videos`, {
            params: { api_key: API_KEY }
        })

        console.log("Trailer API response:", res.data)
        return res.data.results

    } catch (error) {
        console.error("TV Show trailer API error:", error.message)
        return []
    }
}