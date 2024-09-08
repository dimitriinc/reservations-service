import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer({ activeLink, activateLink }) {
    const [corporateVisibility, setVisibility] = useState({
        titleVisible: false,
        emailVisible: false,
    })

    useEffect(() => {
        setVisibility({
            titleVisible: true,
            emailVisible: false,
        })
    }, [])

    const onTitleClick = () => {
        setVisibility({
            titleVisible: false,
            emailVisible: true,
        })
    }

    const onEmailClick = () => {
        setVisibility({
            titleVisible: true,
            emailVisible: false,
        })
    }

    return (
        <>
            <footer>
                <nav className="footer-navigation">
                    <p className="address hide-for-desktop">
                        Mercaderes 142, Arequipa
                    </p>
                    <div className="bottom-navigation hide-for-mobile">
                        <span>
                            <Link
                                className={`footer-link ${
                                    activeLink === 4 ? 'is-active' : ''
                                }`}
                                to="/carreras"
                                onClick={activateLink.bind(null, 4)}
                            >
                                carreras
                            </Link>
                        </span>
                        <span>
                            <p>mercaderes 142, arequipa</p>
                        </span>
                        <span>
                            <Link
                                className={`footer-link ${
                                    activeLink === 5 ? 'is-active' : ''
                                }`}
                                to="/contacto"
                                onClick={activateLink.bind(null, 5)}
                            >
                                contacto
                            </Link>
                        </span>
                    </div>

                    <div className="socials">
                        <a
                            className="hide-for-mobile social-button"
                            href="https://www.instagram.com/cafevinowinebar/"
                            target="_blank"
                        >
                            <svg
                                width="25px"
                                height="25px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z"
                                    fill="#fcfaeb"
                                />
                            </svg>
                        </a>

                        <Link
                            className="signup-cta"
                            to="/signup"
                            onClick={activateLink.bind(null, 6)}
                            style={
                                activeLink === 6
                                    ? {
                                          opacity: 0.2,
                                          pointerEvents: 'none',
                                          cursor: 'default',
                                      }
                                    : null
                            }
                        >
                            inscribirse
                        </Link>

                        <a
                            className="hide-for-mobile social-button"
                            href="https://www.facebook.com/CafeYVinoWinebar"
                            target="_blank"
                        >
                            <svg
                                width="25px"
                                height="25px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H12V13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H12V9.5C12 7.567 13.567 6 15.5 6H16.1C16.6523 6 17.1 6.44772 17.1 7C17.1 7.55228 16.6523 8 16.1 8H15.5C14.6716 8 14 8.67157 14 9.5V11H16.1C16.6523 11 17.1 11.4477 17.1 12C17.1 12.5523 16.6523 13 16.1 13H14V20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6Z"
                                    fill="#fcfaeb"
                                />
                            </svg>
                        </a>
                    </div>
                </nav>

                <div className="corporate-area">
                    <div className="corporate-container">
                        <p
                            onClick={onTitleClick}
                            className={
                                corporateVisibility.titleVisible
                                    ? 'emerged'
                                    : 'submerged'
                            }
                            id="dimitriinc"
                        >
                            powered by DimitriInc.
                        </p>
                        <p
                            onClick={onEmailClick}
                            className={
                                corporateVisibility.emailVisible
                                    ? 'emerged'
                                    : 'submerged'
                            }
                            id="dimi_email"
                        >
                            dimitriinc@proton.me
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
