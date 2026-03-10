import { useEffect, useState } from "react"
import { getTvShowTrailer } from "../services/movies.api"

export const useTvShowTrailer = (id) => {
    const [trailer, setTrailer] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchTrailer = async () => {
            if (!id) return

            setLoading(true)
            try {
                const videos = await getTvShowTrailer(id)

                // Find the first YouTube trailer or teaser
                const trailerVideo = videos.find(video =>
                    (video.type === "Trailer" || video.type === "Teaser") && video.site === "YouTube" && video.key
                )

                setTrailer(trailerVideo)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

        fetchTrailer()
    }, [id, loading])

    return { trailer, loading }
}