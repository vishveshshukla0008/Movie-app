import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleTvShow } from "../movieSlice"

export const useSingleTvShow = (id) => {
    const dispatch = useDispatch()

    const { singleTvShowDetails, loading } = useSelector(
        (state) => state.movies
    )

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleTvShow(id))
        }
    }, [id, dispatch])

    return {
        singleTvShowDetails,
        loading
    }
}
