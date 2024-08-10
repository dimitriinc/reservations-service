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
                                className="footer-link"
                                to="/carreras"
                                onClick={activateLink.bind(null, 4)}
                                style={
                                    activeLink === 4
                                        ? {
                                              pointerEvents: 'none',
                                              cursor: 'default',
                                              color: '#7a5e5d',
                                          }
                                        : null
                                }
                            >
                                carreras
                            </Link>
                        </span>
                        <span>
                            <p>mercaderes 142, arequipa</p>
                        </span>
                        <span>
                            <Link
                                className="footer-link"
                                to="/contacto"
                                onClick={activateLink.bind(null, 5)}
                                style={
                                    activeLink === 5
                                        ? {
                                              pointerEvents: 'none',
                                              cursor: 'default',
                                              color: '#7a5e5d',
                                          }
                                        : null
                                }
                            >
                                contacto
                            </Link>
                        </span>
                    </div>

                    <div className="socials">
                        <a
                            className="hide-for-mobile"
                            href="https://www.instagram.com/cafevinowinebar/"
                            target="_blank"
                        >
                            <img
                                src="/images/socials/instagram-logo-overlay.png"
                                alt="instagram_logo"
                            />
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
                            className="hide-for-mobile"
                            href="https://www.facebook.com/CafeYVinoWinebar"
                            target="_blank"
                        >
                            <img
                                src="/images/socials/facebook_icon_overlay.png"
                                alt="facebook_logo"
                            />
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
