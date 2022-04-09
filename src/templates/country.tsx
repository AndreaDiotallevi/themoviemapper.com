import React, { useState, useEffect } from "react"
import { graphql, PageProps } from "gatsby"
import axios from "axios"
import { IGatsbyImageData } from "gatsby-plugin-image"
import queryString from "query-string"

import SEO from "../components/seo"
import MovieDetail from "../components/movieDetail"
import Header from "../components/header"

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
        const test = async () => {
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

        test()
    }, [])

    const filterMovies = () => {
        const values = queryString.parse(search)
        // console.log(values)

        if (!values["genre"] || values["genre"] === "All") {
            return movies
        } else {
            return movies.filter(movie =>
                movie.Genre.split(", ").includes(values["genre"])
            )
        }
    }

    return (
        <div>
            <Header
                isHome={false}
                title={`WELCOME TO ${countriesJson.name.toUpperCase()}`}
            />
            <SEO
                title="The Movie Mapper - TBC"
                description="Find The Best Movies From Each Country By Clicking On The Map Of The World"
                tags={[]}
            />
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
