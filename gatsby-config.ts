import type { GatsbyConfig } from "gatsby"
import path from "path"

const config: GatsbyConfig = {
    siteMetadata: {
        title: `The Movie Mapper - Find The Best Movies From Each Country`,
        author: `Andrea Diotallevi`,
        description: `Find The Best Movies From Each Country By Clicking On The Map Of The World`,
        url: `https://www.themoviemapper.com`,
        image: `/globe.png`,
        twitterUsername: `@a_diotallevi_`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: path.resolve("src"),
            },
        },
        `gatsby-plugin-image`,
        // `gatsby-plugin-sharp`,
        // `gatsby-transformer-sharp`,
        "gatsby-transformer-json",
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: ["Inter:400,700"],
                display: "swap",
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    process.env.GA_TRACKING_ID,
                    process.env.GA4_TRACKING_ID,
                ],
                pluginConfig: {
                    head: true,
                },
            },
        },
        // {
        //     resolve: `@ccalamos/gatsby-source-googlemaps-static`,
        //     options: {
        //         key: process.env.REACT_APP_MAPS_API,
        //         center: `LATITUDE,LONGITUDE || CITY,REGION`,
        //     },
        // },
    ],
}

export default config
