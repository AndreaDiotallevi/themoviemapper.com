import React from "react"
import GoogleMapReact from "google-map-react"

const IndexPage = () => {
    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API || "" }}
                defaultCenter={{
                    lat: 15,
                    lng: 0,
                }}
                defaultZoom={2.4}
                onClick={value => console.log(value)}
            />
        </div>
    )
}

export default IndexPage
