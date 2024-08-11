import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

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
                <div
                    className={`mobile-nav-menu hide-for-desktop ${
                        menuOpen ? 'slide-in' : 'slide-out'
                    }`}
                >
                    <div className="slider-links mobile-links-canvas">
                        <Link
                            to="/horarios"
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 1 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 1)}
                        >
                            horarios & ubicación
                        </Link>
                        <Link
                            to="/carta"
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 2 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 2)}
                        >
                            carta
                        </Link>
                        <Link
                            to="/reservas"
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 3 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 3)}
                        >
                            reservaciones
                        </Link>

                        <Link
                            to="/carreras"
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 4 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 4)}
                        >
                            carreras
                        </Link>
                        <Link
                            to="/contacto"
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 5 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 5)}
                        >
                            contacto
                        </Link>
                    </div>
                    <div
                        className={`slider-links social-links ${
                            menuOpen ? 'fade-in' : 'fade-out'
                        }`}
                    >
                        <a
                            href="https://www.instagram.com/cafevinowinebar/"
                            target="_blank"
                        >
                            <img
                                src="/images/socials/instagram-logo-regal.png"
                                className={`slider-links ${
                                    menuOpen ? 'fade-in' : 'fade-out'
                                }`}
                                heigth="26px"
                                width="26px"
                                alt="insta-logo"
                            />
                        </a>
                        <a
                            href="https://www.facebook.com/CafeYVinoWinebar"
                            target="_blank"
                        >
                            <img
                                src="/images/socials/facebook_icon_regal.png"
                                className={`slider-links ${
                                    menuOpen ? 'fade-in' : 'fade-out'
                                }`}
                                alt="facebook_logo"
                                heigth="26px"
                                width="26px"
                            />
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.cafeyvinowinebar.Cafe_y_Vino"
                            target="_blank"
                        >
                            <img
                                src="/images/socials/android-logo-regal.png"
                                className={`slider-links ${
                                    menuOpen ? 'fade-in' : 'fade-out'
                                }`}
                                alt="android_logo"
                                heigth="26px"
                                width="26px"
                            />
                        </a>
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
