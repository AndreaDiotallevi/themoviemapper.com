import React from "react"
import axios from "axios"
import { navigate } from "gatsby"
import GoogleMapReact from "google-map-react"
import SEO from "../components/seo"

import "../styles/index.scss"

const IndexPage = () => {
    const handleClick = async ({
        lat,
        lng,
    }: GoogleMapReact.ClickEventValue) => {
        try {
            const response = await axios.get(
                `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATION_API}&lat=${lat}&lon=${lng}&format=json`
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
                tags={[]}
            />
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API || "" }}
                defaultCenter={{
                    lat: 15,
                    lng: 0,
                }}
                defaultZoom={2.4}
                onClick={handleClick}
            />
        </div>
    )
}

export default IndexPage
