import React from "react"
import { Link } from "gatsby"

type DataProps = {
    isHome: boolean
    title: string
}

const Header = (props: DataProps) => {
    const { isHome, title } = props

    return (
        <div className="header-component">
            <div className="header-container">
                {!isHome && (
                    <Link to="/" data-test="back-home-link">
                        <i className="arrow-left"></i>
                    </Link>
                )}
                <h1 className="header-title" data-test="header-title">
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default Header
