import { useState, useRef, useEffect } from 'react'
import WebGL from '../webgl/WebGL'

function Reservas({ activateLink }) {
    const titleSection = useRef()
    const formSection = useRef()
    const scetchSection = useRef()
    const bottomSection = useRef()
    const webglSection = useRef()

    const [webglEnabled, setWebglEnabled] = useState(false)

    useEffect(() => {
        if (webglEnabled) document.body.classList.add('noscroll')
        else document.body.classList.remove('noscroll')
    }, [webglEnabled])

    useEffect(() => {
        activateLink(3)

        // const reveal = function (entries, observer) {
        //     const [entry] = entries
        //     if (entry.isIntersecting) {
        //         entry.target.classList.add('revealed')
        //         observer.unobserve(entry.target)
        //     }
        // }
        // const revealOptions = {
        //     root: null,
        //     threshold: 0.15,
        // }
        // const revealObserver = new IntersectionObserver(reveal, revealOptions)

        // Array.of(
        //     titleSection.current,
        //     formSection.current,
        //     webglSection.current,
        //     scetchSection.current,
        //     bottomSection.current
        // ).forEach((section) => {
        //     if (section.dataset.first === '1') {
        //         setTimeout(() => {
        //             revealObserver.observe(section)
        //         }, 500)
        //     } else {
        //         revealObserver.observe(section)
        //     }
        // })
    }, [])

    const enableWebgl = () => {
        setWebglEnabled(true)
    }
    const disableWebgl = (e) => {
        if (e.target.classList.contains('overlay')) setWebglEnabled(false)
    }

    return (
        <div className="main-reservas">
            {webglEnabled ? <WebGL disableWebgl={disableWebgl} /> : null}
            <section
                className=""
                ref={titleSection}
            >
                <div className="reserv-text">
                    <h2 className="aux_title">Reservaciones</h2>

                    <p>
                        Llene el formulario y reciba una confirmación en el
                        correo electrónico que proporciona.
                        <br />
                        ¡Rápido y fácil!
                    </p>
                </div>
            </section>
            <section
                className=""
                ref={webglSection}
                onClick={enableWebgl}
            >
                <button className="button-control-round">To WebGL</button>
            </section>
            <section
                className=""
                ref={formSection}
            >
                <form id="reserv-form">
                    <div className="reserv-form">
                        <input
                            required
                            id="reserv-name"
                            className="input-control"
                            type="text"
                            placeholder="Nombre"
                            name="name"
                        />

                        <input
                            required
                            id="reserv-tel"
                            className="input-control"
                            type="tel"
                            placeholder="Número de teléfono"
                            name="phone"
                        />

                        <input
                            required
                            name="email"
                            id="reserv-email"
                            type="email"
                            className="input-control"
                            placeholder="Email"
                        />

                        <p id="pax-display">
                            Cantidad de personas:{' '}
                            <span className="pax-value"></span>
                        </p>

                        <input
                            id="reserv-pax"
                            type="range"
                            className="input-control "
                            min="1"
                            max="15"
                            placeholder="Cantidad de personas"
                            name="pax"
                            step="1"
                        />

                        <textarea
                            id="reserv-comment"
                            name="comment"
                            rows="5"
                            className="input-control"
                            placeholder="Información adicional"
                        ></textarea>
                    </div>

                    <div className="calendar">
                        <div className="calendar-header">
                            <div
                                className="arrows prev-mth"
                                style={{ fontFamily: 'Futura' }}
                            >
                                &lt;
                            </div>
                            <div className="mth"></div>
                            <div
                                className="arrows next-mth"
                                style={{ fontFamily: 'Futura' }}
                            >
                                &gt;
                            </div>
                        </div>

                        <table id="calendar-body">
                            <thead>
                                <tr>
                                    <th className="week-day">Lun</th>
                                    <th className="week-day">Mar</th>
                                    <th className="week-day">Mie</th>
                                    <th className="week-day">Jue</th>
                                    <th className="week-day">Vie</th>
                                    <th className="week-day">Sab</th>
                                    <th className="week-day">Dom</th>
                                </tr>
                            </thead>

                            <tbody id="calendar-dates"></tbody>
                        </table>

                        <input
                            type="hidden"
                            name="date"
                            id="reserv-date"
                        />
                    </div>

                    <div className="time">
                        <p>
                            La hora de llegada
                            <br />
                            14:00 &#8212; 21:00
                        </p>
                        <input
                            required
                            id="reserv-hour"
                            type="time"
                            name="hour"
                            className="input-control"
                        />
                    </div>

                    <div className="reserv-button">
                        <input
                            id="reserv-btn"
                            type="submit"
                            className="button-control-round"
                            value="ENVIAR"
                        />

                        <img
                            src="/images/loaders/broadcaster.svg"
                            id="loader"
                            style={{ display: 'none' }}
                        />
                    </div>
                </form>
            </section>

            <section
                className=""
                ref={scetchSection}
            >
                <img
                    src="/images/scetches/chairInCorner_noise.png"
                    style={{
                        width: '300px',
                        height: '265px',
                        marginBottom: '2rem',
                    }}
                />
            </section>

            <section
                className="bottom-image "
                ref={bottomSection}
            ></section>
        </div>
    )
}

export default Reservas
