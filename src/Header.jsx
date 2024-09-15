import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header({ activeLink, activateLink }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [headerScrolling, setHeaderScrolling] = useState(false)

    const headerSlicer = useRef()
    const headerSpacer = useRef()

    const location = useLocation()

    useEffect(() => {
        if (menuOpen) document.body.classList.add('noscroll')
        else document.body.classList.remove('noscroll')
    }, [menuOpen])

    useEffect(() => {
        // Observer
        const obsCallback = function (entries) {
            const [entry] = entries
            if (!entry.isIntersecting) {
                setHeaderScrolling(true)
            } else {
                setHeaderScrolling(false)
            }
        }
        const obsOptions = {
            root: null,
            threshold: 0,
        }
        const observer = new IntersectionObserver(obsCallback)
        if (document.documentElement.clientWidth < 769)
            observer.observe(headerSlicer.current)
        if (document.documentElement.clientWidth > 769)
            observer.observe(headerSpacer.current)

        // return () => {
        //     if (headerSlicer.current) observer.unobserve(headerSlicer.current)
        // }
    }, [])

    const onHamburgerClick = () => setMenuOpen((value) => !value)
    const onLinkClick = (index) => {
        // Close the sliding menu in the mobile mode
        setMenuOpen(false)

        // If we are on the Home screen and the Link clicked is the logo, we just reload the page
        if (location.pathname === '/' && index === 0) {
            window.location.reload()
        }

        // Update the active link according to the Link clicked
        activateLink(index)
    }

    return (
        <>
            <div
                ref={headerSlicer}
                className="header-slicer hide-for-desktop"
            ></div>
            <div
                ref={headerSpacer}
                className="header-spacer"
            ></div>

            <header
                className={`header ${menuOpen ? 'open' : ''} ${
                    headerScrolling ? 'scroll' : ''
                }`}
            >
                <div className={`mobile-nav hide-for-desktop`}>
                    <div className="mobile-links-container">
                        <Link
                            to="/horarios"
                            className={`mobile-link ${
                                activeLink === 1 ? 'is-active' : ''
                            }`}
                            onClick={onLinkClick.bind(null, 1)}
                        >
                            horarios & ubicación
                        </Link>
                        <Link
                            to="/carta"
                            className={`mobile-link ${
                                activeLink === 2 ? 'is-active' : ''
                            }`}
                            onClick={onLinkClick.bind(null, 2)}
                        >
                            carta
                        </Link>
                        <Link
                            to="/reservas"
                            className={`mobile-link ${
                                activeLink === 3 ? 'is-active' : ''
                            }`}
                            onClick={onLinkClick.bind(null, 3)}
                        >
                            reservaciones
                        </Link>

                        <Link
                            to="/carreras"
                            className={`mobile-link ${
                                activeLink === 4 ? 'is-active' : ''
                            }`}
                            onClick={onLinkClick.bind(null, 4)}
                        >
                            carreras
                        </Link>
                        <Link
                            to="/contacto"
                            className={`mobile-link ${
                                activeLink === 5 ? 'is-active' : ''
                            }`}
                            onClick={onLinkClick.bind(null, 5)}
                        >
                            contacto
                        </Link>

                        <div className={`mobile-social-links-container`}>
                            <a
                                href="https://www.instagram.com/cafevinowinebar/"
                                target="_blank"
                            >
                                <svg
                                    width="25px"
                                    height="25px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mobile-social-link-icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z"
                                        fill="#160b17"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/CafeYVinoWinebar"
                                target="_blank"
                            >
                                <svg
                                    width="25px"
                                    height="25px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mobile-social-link-icon"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H12V13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H12V9.5C12 7.567 13.567 6 15.5 6H16.1C16.6523 6 17.1 6.44772 17.1 7C17.1 7.55228 16.6523 8 16.1 8H15.5C14.6716 8 14 8.67157 14 9.5V11H16.1C16.6523 11 17.1 11.4477 17.1 12C17.1 12.5523 16.6523 13 16.1 13H14V20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6Z"
                                        fill="#160b17"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.cafeyvinowinebar.Cafe_y_Vino"
                                target="_blank"
                            >
                                <img
                                    src="/images/socials/android-logo.svg"
                                    alt="Android logo"
                                    width="25px"
                                    height="25px"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <nav
                    className={`flex flex-ai-c ${
                        headerScrolling ? 'sticky' : ''
                    }`}
                >
                    <Link
                        to="/"
                        className="header__logo"
                        onClick={onLinkClick.bind(null, 0)}
                    >
                        <img
                            src="/images/logo_inline_black.svg"
                            alt="Cafè y Vino"
                        />
                    </Link>

                    <div
                        onClick={onHamburgerClick}
                        id="btnHamburger"
                        className="header__toggle hide-for-desktop"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className="header__links hide-for-mobile">
                        <Link
                            to="/horarios"
                            onClick={onLinkClick.bind(null, 1)}
                            className={`nav-link ${
                                activeLink === 1 ? 'is-active' : ''
                            }`}
                        >
                            Horarios & Ubicación
                        </Link>
                        <Link
                            to="/carta"
                            onClick={onLinkClick.bind(null, 2)}
                            className={`nav-link ${
                                activeLink === 2 ? 'is-active' : ''
                            }`}
                        >
                            Carta
                        </Link>
                        <Link
                            to="/reservas"
                            onClick={onLinkClick.bind(null, 3)}
                            className={`nav-link ${
                                activeLink === 3 ? 'is-active' : ''
                            }`}
                        >
                            Reservaciones
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    )
}
