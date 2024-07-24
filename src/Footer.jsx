export default function Footer() {
    return (
        <>
            <footer>
                <nav className="footer-navigation">
                    <p className="address hide-for-desktop">
                        Mercaderes 142, Arequipa
                    </p>
                    <div className="bottom-navigation hide-for-mobile">
                        <span>
                            <a href="carreras/">carreras</a>
                        </span>
                        <span>
                            <p>mercaderes 142, arequipa</p>
                        </span>
                        <span>
                            <a href="contacto/">contacto</a>
                        </span>
                    </div>

                    <div className="socials">
                        <a
                            className="hide-for-mobile"
                            href="https://www.instagram.com/cafevinowinebar/"
                            target="_blank"
                        >
                            <img
                                src="/images/instagram-logo-overlay.png"
                                alt="instagram_logo"
                            />
                        </a>

                        <a
                            className="signup-cta"
                            href="signup/"
                        >
                            inscribirse
                        </a>

                        <a
                            className="hide-for-mobile"
                            href="https://www.facebook.com/CafeYVinoWinebar"
                            target="_blank"
                        >
                            <img
                                src="/images/facebook_icon_overlay.png"
                                alt="facebook_logo"
                            />
                        </a>
                    </div>
                </nav>

                <div className="corporate-area">
                    <div className="corporate-container">
                        <p id="dimitriinc">powered by DimitriInc.</p>
                        <p id="dimi_email">dimitriinc@proton.me</p>
                    </div>
                </div>
            </footer>
        </>
    )
}
