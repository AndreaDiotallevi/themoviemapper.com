import React from "react"
import axios from "axios"
import { navigate } from "gatsby"
import GoogleMapReact from "google-map-react"

import SEO from "../components/seo"
import Header from "../components/header"

import "../styles/index.scss"

const IndexPage = () => {
    const handleClick = async ({
        lat,
        lng,
    }: GoogleMapReact.ClickEventValue) => {
        try {
            const response = await axios.get(
                `https://us1.locationiq.com/v1/reverse.php?key=${process.env.GATSBY_LOCATION_API}&lat=${lat}&lon=${lng}&format=json`
            )

            if (!response) return

            const countryCode = response.data.address.country_code
            if (!countryCode) return

            const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
                type: "region",
            })
            const country = regionNamesInEnglish.of(countryCode.toUpperCase())
            if (!country) return

            navigate(`/${country.replace(/\s+/g, "-").toLowerCase()}`)
        } catch (err) {
            return
        }
    }

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <SEO
                title="The Movie Mapper - Find The Best Movies From Each Country"
                description="Find The Best Movies From Each Country By Clicking On The Map Of The World"
                tags={[
                    "The Movie Mapper",
                    "Movies",
                    "Best Movies",
                    "Best Movies By Country",
                    "Click On Map",
                ]}
            />
            <Header isHome={true} title="THE MOVIE MAPPER" />
            <div className="sub-header-description" style={{ margin: 0 }}>
                <p style={{ padding: 8, width: "100%" }}>
                    Click on a country and find the best movies from that
                    country!
                </p>
            </div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GATSBY_MAPS_API || "" }}
                defaultCenter={{
                    lat: 15,
                    lng: 0,
                }}
                defaultZoom={2.4}
                onClick={handleClick}
                options={{
                    styles: [
                        {
                            featureType: "all",
                            elementType: "all",
                            stylers: [
                                {
                                    visibility: "off",
                                },
                            ],
                        },
                        {
                            featureType: "all",
                            elementType: "labels.text.fill",
                            stylers: [
                                {
                                    color: "#FFFFFF",
                                },
                                {
                                    visibility: "on",
                                },
                                {
                                    "font-family": "Work Sans",
                                },
                            ],
                        },
                        {
                            featureType: "administrative.country",
                            elementType: "geometry.stroke",
                            stylers: [
                                {
                                    visibility: "on",
                                },
                                {
                                    color: "#FFFFFF",
                                },
                            ],
                        },
                        {
                            featureType: "landscape.natural",
                            elementType: "geometry.fill",
                            stylers: [
                                {
                                    visibility: "on",
                                },
                                {
                                    color: "#4d6059",
                                },
                            ],
                        },
                        {
                            featureType: "water",
                            elementType: "all",
                            stylers: [
                                {
                                    color: "#38444C",
                                },
                                {
                                    visibility: "on",
                                },
                            ],
                        },
                    ],
                }}
            />
        </div>
    )
}

export default IndexPage
