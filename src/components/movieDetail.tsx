import React from "react"
import { graphql } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

import { Movie } from "../templates/country"

type DataProps = {
    movie: Movie
    file: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData
            fixed: {
                src: string
            }
        }
    }
}

const MovieDetail = (props: DataProps) => {
    const { movie, file } = props
    const {
        imdbID,
        Title: title,
        Plot: plot,
        Poster: posterURL,
        Released: releaseDate,
    } = movie

    const handleImageUrlError = (
        event: React.SyntheticEvent<HTMLImageElement>
    ) => {
        event.target.src = file.childImageSharp.fixed.src
    }

    return (
        <li className="movie">
            <div className="movie-image">
                <a
                    href={`https://www.imdb.com/title/${imdbID}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        className="movie-poster"
                        alt={`movie-poster-url-${imdbID}`}
                        src={`${posterURL}`}
                        onError={handleImageUrlError}
                    ></img>
                </a>
            </div>
            <div className="movie-info">
                <div className="title-plot-container">
                    <div className="movie-title-container">
                        <a
                            className="movie-title-anchor"
                            href={`https://www.imdb.com/title/${imdbID}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <h2 className="movie-title">{title}</h2>
                        </a>
                    </div>
                    <p className="movie-plot">{plot}</p>
                </div>
                <div className="date-rating-container">
                    <p className="movie-release-date">
                        <span className="movie-release-date-title"></span>
                        {releaseDate}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default MovieDetail
