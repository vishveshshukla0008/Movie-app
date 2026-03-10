import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
    getTrendingMovies,
    getTrendingShows,
    getMovies,
    getTVShows,
    getSingleTvShowDetails,
    getMovieDetails
} from "./services/movies.api"


export const fetchTrendingMovies = createAsyncThunk(
    "movies/fetchTrendingMovies",
    async () => {
        return await getTrendingMovies()
    }
)

export const fetchTrendingShows = createAsyncThunk(
    "movies/fetchTrendingShows",
    async () => {
        return await getTrendingShows()
    }
)

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    // page may be provided by caller; default to 1
    async (page = 1) => {
        const data = await getMovies(page)
        return { ...data, page }
    }
)

export const fetchTVShows = createAsyncThunk(
    "movies/fetchTVShows",
    async (page = 1) => {
        const data = await getTVShows(page)
        return { ...data, page }
    }
)

export const fetchSingleTvShow = createAsyncThunk(
    "movies/fetchSingleTvShow",
    async (id) => {
        return await getSingleTvShowDetails(id);
    }
)

export const fetchSingleMovie = createAsyncThunk(
    "movies/fetchSingleMovie",
    async (id) => {
        return await getMovieDetails(id);
    }
)


const movieSlice = createSlice({
    name: "movies",

    initialState: {
        trendingMovies: [],
        trendingShows: [],
        movies: [],
        moviesPage: 1,
        moviesTotalPages: null,
        tvShows: [],
        tvShowsPage: 1,
        tvShowsTotalPages: null,
        loading: false,            // still used for trending loading
        loadingMovies: false,
        loadingTVShows: false,
        singleTvShowDetails: {},
        singleMovieDetails: {}
    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            // TRENDING MOVIES
            .addCase(fetchTrendingMovies.pending, (state) => {
                state.loading = true
            })

            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.loading = false
                state.trendingMovies = action.payload
            })

            .addCase(fetchTrendingMovies.rejected, (state) => {
                state.loading = false
                state.error = "Failed to fetch trending movies"
            })


            // TRENDING TV SHOWS
            .addCase(fetchTrendingShows.fulfilled, (state, action) => {
                state.trendingShows = action.payload
            })


            // MOVIES
            .addCase(fetchMovies.pending, (state) => {
                state.loadingMovies = true
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                const { results = [], page, total_pages } = action.payload
                if (page && page > 1) {
                    state.movies = [...state.movies, ...results]
                } else {
                    state.movies = results
                }
                state.moviesPage = page || 1
                state.moviesTotalPages = total_pages || state.moviesTotalPages
                state.loadingMovies = false
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.loadingMovies = false
                state.error = "Failed to fetch movies"
            })

            // TV SHOWS
            .addCase(fetchTVShows.pending, (state) => {
                state.loadingTVShows = true
            })
            .addCase(fetchTVShows.fulfilled, (state, action) => {
                const { results = [], page, total_pages } = action.payload
                if (page && page > 1) {
                    state.tvShows = [...state.tvShows, ...results]
                } else {
                    state.tvShows = results
                }
                state.tvShowsPage = page || 1
                state.tvShowsTotalPages = total_pages || state.tvShowsTotalPages
                state.loadingTVShows = false
            })
            .addCase(fetchTVShows.rejected, (state) => {
                state.loadingTVShows = false
                state.error = "Failed to fetch tv shows"
            })


            //single tv show details

            .addCase(fetchSingleTvShow.fulfilled, (state, action) => {
                state.singleTvShowDetails = action.payload
            })

            //single movie details
            .addCase(fetchSingleMovie.fulfilled, (state, action) => {
                state.singleMovieDetails = action.payload
            })
    }

})

export default movieSlice.reducer