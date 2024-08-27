import { useState, useRef, useEffect } from 'react'
import WebGL from '../webgl/WebGL'
import DatePicker from '../custom/DatePicker'

function Reservas({ activateLink }) {
    const titleSection = useRef()
    const formSection = useRef()
    const scetchSection = useRef()
    const bottomSection = useRef()
    const webglSection = useRef()

    const timeInput = useRef()

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        pax: 2,
        comment: '',
        date: '',
        hour: '',
    })

    const [webglEnabled, setWebglEnabled] = useState(false)
    const [secondPartVisible, setSecondPartVisible] = useState(false)

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

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const setChosenDate = (dateString) => {
        setFormData({ ...formData, date: dateString })
    }

    const handleTimeInput = (e) => {
        if (e.target.value < '14:00' || e.target.value > '21:00') {
            timeInput.current.setCustomValidity(
                'Por favor ingresa la hora entre 14:00 y 21:00'
            )
        } else {
            timeInput.current.setCustomValidity('')
            setFormData({
                ...formData,
                hour: e.target.value,
            })
        }
    }

    const openSecondPart = () => {
        setSecondPartVisible(!secondPartVisible)
    }

    const sendForm = (e) => {
        e.preventDefault()
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
                ref={formSection}
            >
                <form
                    id="reserv-form"
                    onSubmit={sendForm}
                >
                    <div className="reserv-form">
                        <input
                            required
                            id="reserv-name"
                            className="input-control"
                            type="text"
                            placeholder="Nombre"
                            name="name"
                            onChange={handleInputChange}
                        />

                        <input
                            required
                            id="reserv-tel"
                            className="input-control"
                            type="tel"
                            placeholder="Número de teléfono"
                            name="phone"
                            onChange={handleInputChange}
                        />

                        <input
                            required
                            name="email"
                            id="reserv-email"
                            type="email"
                            className="input-control"
                            placeholder="Email"
                            onChange={handleInputChange}
                        />

                        <DatePicker setChosenDate={setChosenDate} />

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
                                onInput={handleTimeInput}
                                ref={timeInput}
                            />
                        </div>

                        <section ref={webglSection}>
                            <button
                                className="button-control-round"
                                style={{ marginBottom: '3rem' }}
                                type="button"
                                onClick={enableWebgl}
                            >
                                Escoger mesa
                            </button>
                            <button
                                className="button-control-round"
                                onClick={openSecondPart}
                                type="button"
                            >
                                Seguir sin escoger mesa
                            </button>
                        </section>

                        <div
                            className={`second-part ${
                                secondPartVisible ? 'part-visible' : ''
                            }`}
                        >
                            <p id="pax-display">
                                Cantidad de personas:{' '}
                                <span className="pax-value">
                                    {formData.pax}
                                </span>
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
                                value={formData.pax}
                                onChange={handleInputChange}
                            />

                            <textarea
                                id="reserv-comment"
                                name="comment"
                                rows="5"
                                className="input-control"
                                placeholder="Información adicional"
                                onChange={handleInputChange}
                            ></textarea>

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
                        </div>
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
                        transition: 'all 300ms ease-in-out'
                    }}
                />
            </section>

            <section
                className="bottom-image "
                ref={bottomSection}
                style={{ transition: 'all 300ms ease-in-out' }}
            ></section>
        </div>
    )
}

export default Reservas
