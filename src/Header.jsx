export default function Header() {
    return (
        <>
            <header className="header">
                <div className="mobile-nav-menu hide-for-desktop">
                    <div className="slider-links mobile-links-canvas">
                        <a
                            href="horarios/"
                            className="slider-links"
                        >
                            horarios & ubicación
                        </a>
                        <a
                            href="carta/"
                            className="slider-links"
                        >
                            carta
                        </a>
                        <a
                            href="reservaciones/"
                            className="slider-links"
                        >
                            reservaciones
                        </a>
                        <a
                            href="historia/"
                            className="slider-links"
                        >
                            nuestra historia
                        </a>
                        <a
                            href="carreras/"
                            className="slider-links"
                        >
                            carreras
                        </a>
                        <a
                            href="contacto/"
                            className="slider-links"
                        >
                            contacto
                        </a>
                    </div>
                    <div className="slider-links social-links">
                        <a
                            href="https://www.instagram.com/cafevinowinebar/"
                            target="_blank"
                        >
                            <img
                                src="/images/instagram-logo-regal.png"
                                className="slider-links"
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
                                className="slider-links"
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
                                className="slider-links"
                                alt="android_logo"
                                heigth="26px"
                                width="26px"
                            />
                        </a>
                    </div>
                </div>
                <nav className="flex flex-ai-c">
                    <a
                        href="/"
                        className="header__logo"
                    >
                        <img
                            src="images/logo_inline_black.svg"
                            alt="Cafè y Vino"
                        />
                    </a>

                    <div
                        id="btnHamburger"
                        className="header__toggle hide-for-desktop"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className="header__links hide-for-mobile">
                        <a href="horarios/">Horarios & Ubicación</a>
                        <a href="carta/">Carta</a>
                        <a
                            style={{
                                fontSize: '62px',
                            }}
                            href="reservaciones/"
                        >
                            Reservaciones
                        </a>
                    </div>
                </nav>
            </header>
        </>
    )
}
