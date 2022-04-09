import React, { useState, useEffect } from "react"
import { graphql, navigate, PageProps } from "gatsby"
import axios from "axios"
import { IGatsbyImageData } from "gatsby-plugin-image"
import queryString from "query-string"

import SEO from "../components/seo"
import MovieDetail from "../components/movieDetail"
import Header from "../components/header"
import genreList from "../utils/genreList"

type DataProps = {
    countriesJson: {
        name: string
        movies: string[]
    }
    file: {
        childImageSharp: {
            gatsbyImageData: IGatsbyImageData
            fixed: {
                src: string
            }
        }
    }
}

export type Movie = {
    Actors: string
    Awards: string
    BoxOffice: string
    Country: string
    DVD: string
    Director: string
    Genre: string
    Language: string
    Metascore: string
    Plot: string
    Poster: string
    Production: string
    Rated: string
    Ratings: {
        Source: string
        Value: string
    }[]
    Released: string
    Response: string
    Runtime: string
    Title: string
    Type: string
    Website: string
    Writer: string
    Year: string
    imdbID: string
    imdbRating: string
    imdbVotes: string
}

const Country = ({
    location,
    data: { countriesJson, file },
}: PageProps<DataProps>) => {
    const { search } = location
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        const fetchMovies = async () => {
            countriesJson.movies.forEach(async (movie, index) => {
                const titleUrl = movie.toLowerCase().split(" ").join("-")
                const response = await axios.get(
                    `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API}&t=${titleUrl}`
                )

                if (response.data["Response"] === "True") {
                    setMovies(prevMovies => [...prevMovies, response.data])
                }
            })
        }

        movies.length === 0 && fetchMovies()
    }, [])

    const filterMovies = (): Movie[] => {
        const { genre }: { genre?: string } = queryString.parse(search)

        if (!genre) return movies

        return movies.filter(movie => movie.Genre.toLowerCase().includes(genre))
    }

    return (
        <div>
            <SEO
                title="The Movie Mapper - TBC"
                description="Find The Best Movies From Each Country By Clicking On The Map Of The World"
                tags={[]}
            />
            <Header
                isHome={false}
                title={`WELCOME TO ${countriesJson.name.toUpperCase()}`}
            />
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "black",
                }}
            >
                <div style={{ width: "100%", padding: "0 8px" }}>
                    <div className="genre-buttons">
                        {genreList.map(genre => (
                            <button
                                className="genre-button"
                                value={genre}
                                onClick={() => {
                                    navigate(
                                        genre === "All"
                                            ? location.pathname
                                            : location.pathname +
                                                  `?genre=${genre.toLowerCase()}`
                                    )
                                }}
                                key={genre}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="movie-list-component">
                <div className="movie-list-container">
                    <ul>
                        {filterMovies().map(movie => (
                            <MovieDetail
                                key={movie.Title}
                                movie={movie}
                                file={file}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Country

export const query = graphql`
    query ($slug: String!) {
        countriesJson(fields: { slug: { eq: $slug } }) {
            name
            movies
        }
        file(relativePath: { eq: "assets/no-photo-available.jpeg" }) {
            childImageSharp {
                gatsbyImageData(
                    width: 660
                    quality: 99
                    layout: CONSTRAINED
                    placeholder: BLURRED
                )
                fixed {
                    src
                }
            }
        }
    }
`
