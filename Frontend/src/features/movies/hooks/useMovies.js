import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  fetchTrendingMovies,
  fetchTrendingShows,
  fetchMovies,
  fetchTVShows, fetchSingleTvShow
} from "../movieSlice"


export const useMovies = () => {

  const dispatch = useDispatch()

  const {
    trendingMovies,
    trendingShows,
    movies,
    moviesPage,
    moviesTotalPages,
    tvShows,
    tvShowsPage,
    tvShowsTotalPages,
    loading,
    loadingMovies,
    loadingTVShows,
    singleTvShowDetails
  } = useSelector((state) => state.movies)


  useEffect(() => {

    dispatch(fetchTrendingMovies())
    dispatch(fetchTrendingShows())
    dispatch(fetchMovies(1))
    dispatch(fetchTVShows(1))
    dispatch(fetchSingleTvShow())

  }, [dispatch])


  // helpers that components can call
  const loadMoreMovies = React.useCallback(() => {
    if (moviesPage < (moviesTotalPages || Infinity)) {
      return dispatch(fetchMovies(moviesPage + 1))
    }
    return Promise.resolve()
  }, [dispatch, moviesPage, moviesTotalPages])

  const loadMoreTvShows = React.useCallback(() => {
    if (tvShowsPage < (tvShowsTotalPages || Infinity)) {
      return dispatch(fetchTVShows(tvShowsPage + 1))
    }
    return Promise.resolve()
  }, [dispatch, tvShowsPage, tvShowsTotalPages])

  return {
    trendingMovies,
    trendingShows,
    movies,
    moviesPage,
    moviesTotalPages,
    tvShows,
    tvShowsPage,
    tvShowsTotalPages,
    loading,
    loadingMovies,
    loadingTVShows,
    singleTvShowDetails,
    loadMoreMovies,
    loadMoreTvShows
  }

}