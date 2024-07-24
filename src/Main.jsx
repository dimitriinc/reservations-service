export default function Main() {
    return (
        <>
            <main>
                <section className="hero">
                    <div className="hero__image"></div>
                </section>

                <section className="main-text">
                    <h2 className="fade-in">
                        Café francés de nueva generación
                    </h2>
                    <p className="main-message">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Reprehenderit soluta, esse nemo dolore delectus
                        quia aliquam ad perspiciatis minus saepe
                    </p>
                    <p className="pretencious-slogan">
                        <em>Audaces fortuna juvat.</em>
                    </p>
                    <a href="carta/">
                        <button>Ver carta</button>
                    </a>
                </section>

                <div className="points">
                    <section className="point point-one">
                        <img
                            className="centered round-image"
                            src="images/points/img1.jpeg"
                            alt="point-one"
                            id="img-point-one"
                        />
                        <p
                            className="centered point-text"
                            id="txt-point-one"
                        >
                            Tellus in hac habitasse platea dictumst. Ultrices
                            neque ornare aenean euismod elementum nisi quis
                            eleifend quam.
                        </p>
                    </section>

                    <section className="point point-two">
                        <img
                            src="images/points/img2.jpg"
                            alt="point-two"
                            className="round-image centered"
                        />
                        <p className="centered point-text">
                            In ante metus dictum at. Quis commodo odio aenean
                            sed adipiscing.
                        </p>
                    </section>

                    <section className="point point-three">
                        <img
                            src="images/points/img3.jpg"
                            alt="point-three"
                            className="round-image centered"
                        />
                        <p className="centered point-text">
                            Ullamcorper a lacus vestibulum sed arcu non odio.
                            Consectetur a erat nam at lectus urna duis convallis
                            convallis.
                        </p>
                    </section>
                </div>

                <section className="bottom-image">
                    <a
                        href="reservaciones/"
                        id="to-reserva-btn"
                        className="hide-for-desktop"
                    >
                        Reservar mesa
                    </a>
                </section>
            </main>
        </>
    )
}
