import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleMovie } from "../movieSlice"

export const useSingleMovie = (id) => {
    const dispatch = useDispatch()

    const { singleMovieDetails, loading } = useSelector(
        (state) => state.movies
    )

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleMovie(id))
        }
    }, [id, dispatch])

    return {
        singleMovieDetails,
        loading
    }
}