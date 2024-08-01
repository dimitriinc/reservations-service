import { useState, useEffect, useRef } from 'react'

export default function Header({ activeLink, activateLink }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [headerScrolling, setHeaderScrolling] = useState(false)
    // const [activeLink, setActiveLink] = useState(0)

    const headerSlicer = useRef()
    const headerSpacer = useRef()

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
        setMenuOpen(false)
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
                        <div
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 1 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 1)}
                        >
                            horarios & ubicación
                        </div>
                        <div
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 2 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 2)}
                        >
                            carta
                        </div>
                        <div
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 3 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 3)}
                        >
                            reservaciones
                        </div>

                        <div
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 4 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 4)}
                        >
                            carreras
                        </div>
                        <div
                            className={`mobile-link slider-links ${
                                menuOpen ? 'fade-in' : 'fade-out'
                            } ${activeLink === 5 ? 'is-active' : ''}`}
                            onClick={onLinkClick.bind(null, 5   )}
                        >
                            contacto
                        </div>
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
                                src="/images/instagram-logo-regal.png"
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
                                src="/images/facebook_icon_regal.png"
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
                                src="/images/android-logo-regal.png"
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
                    <a
                        href="/"
                        className="header__logo"
                    >
                        <img
                            src="/images/logo_inline_black.svg"
                            alt="Cafè y Vino"
                        />
                    </a>

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
                        <div
                            onClick={onLinkClick.bind(null, 1)}
                            className={`nav-link ${
                                activeLink === 1 ? 'is-active' : ''
                            }`}
                        >
                            Horarios & Ubicación
                        </div>
                        <div
                            onClick={onLinkClick.bind(null, 2)}
                            className={`nav-link ${
                                activeLink === 2 ? 'is-active' : ''
                            }`}
                        >
                            Carta
                        </div>
                        <div
                            onClick={onLinkClick.bind(null, 3)}
                            className={`nav-link ${
                                activeLink === 3 ? 'is-active' : ''
                            }`}
                        >
                            Reservaciones
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
