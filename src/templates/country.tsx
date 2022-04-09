import React from "react"
import { graphql, PageProps } from "gatsby"
import SEO from "../components/seo"

type DataProps = {
    countriesJson: {
        name: string
        movies: string[]
    }
}

const Country = ({
    location,
    data: { countriesJson },
}: PageProps<DataProps>) => {
    const { search } = location
    console.log(search)
    console.log(countriesJson)

    // const filterMovies = () => {
    //     const values = queryString.parse(search)

    //     if (!values["genre"] || values["genre"] === "All") {
    //         return this.props.movies
    //     } else {
    //         return this.props.movies.filter(movie =>
    //             movie.Genre.split(", ").includes(values["genre"])
    //         )
    //     }
    // }

    return (
        <div>
            <SEO
                title="The Movie Mapper - TBC"
                description="Find The Best Movies From Each Country By Clicking On The Map Of The World"
                tags={[]}
            />
            <div className="movie-list-component">
                <div className="movie-list-container">
                    {/* <ul>
                        {filterMovies().map(movie => (
                            <MovieDetail
                                key={movie.imdbID}
                                imdbID={movie.imdbID}
                                title={movie.Title}
                                plot={movie.Plot}
                                posterURL={movie.Poster}
                                releaseDate={movie.Released}
                            />
                        ))}
                    </ul> */}
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
    }
`
