import { useState, useRef, useEffect } from 'react'
import WebGL from '../webgl/WebGL'
import DatePicker from '../custom/DatePicker'
import AlertDialog from '../custom/AlertDialog'
import { useNavigate } from 'react-router-dom'

function Reservas({ activateLink }) {
    const titleSection = useRef()
    const formSection = useRef()
    const scetchSection = useRef()
    const bottomSection = useRef()
    const webglSection = useRef()

    const timeInput = useRef()

    const [formData, setFormData] = useState({
        name: sessionStorage.getItem('name') || '',
        phone: sessionStorage.getItem('phone') || '',
        email: sessionStorage.getItem('email') || '',
        pax: sessionStorage.getItem('pax') || 2,
        comment: sessionStorage.getItem('comment') || '',
        date: sessionStorage.getItem('date') || '',
        hour: sessionStorage.getItem('hour') || '',
    })

    const [webglEnabled, setWebglEnabled] = useState(false)
    const [secondPartVisible, setSecondPartVisible] = useState(false)
    const [alerting, setAlerting] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [sending, setSending] = useState(false)
    const [reservationSent, setReservationSent] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        if (webglEnabled || alerting) document.body.classList.add('noscroll')
        else document.body.classList.remove('noscroll')
    }, [webglEnabled, alerting])

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
        sessionStorage.setItem(name, value)
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const setChosenDate = (dateString) => {
        console.log(dateString)
        sessionStorage.setItem('date', dateString)
        setFormData({ ...formData, date: dateString })
    }

    const handleTimeInput = (e) => {
        // if (e.target.value < '14:00' || e.target.value > '21:00') {
        //     timeInput.current.setCustomValidity(
        //         'Por favor ingresa la hora entre 14:00 y 21:00'
        //     )
        // } else {
        //     timeInput.current.setCustomValidity('')
        //     sessionStorage.setItem('hour', e.target.value)
        //     setFormData({
        //         ...formData,
        //         hour: e.target.value,
        //     })
        // }

        sessionStorage.setItem('hour', e.target.value)
            setFormData({
                ...formData,
                hour: e.target.value,
            })
    }

    const openSecondPart = () => {
        setSecondPartVisible(!secondPartVisible)
    }

    const sendForm = async (e) => {
        e.preventDefault()
        setSending(true)
        try {
            const response = await fetch('https://non-existent-url.net/make-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            setReservationSent(true)
            setAlertMsg('Gracias por la solicitud!')
            setSending(false)
            setAlerting(true)
            navigate('/')
        } catch (_) {
            // Dummy response, change when at production
            setTimeout(() => {
                setReservationSent(true)
                setAlertMsg('Gracias por la solicitud!')
                setSending(false)
                setAlerting(true)
            }, 2000)
        }
    }

    const exitDialog = () => {
        setAlerting(false)
        sessionStorage.clear()
        document.body.classList.remove('noscroll')
        // if (reservationSent) navigate('/)
        navigate('/')
    }

    return (
        <div className="main-reservas">
            {webglEnabled ? <WebGL disableWebgl={disableWebgl} /> : null}
            {alerting ? (
                <AlertDialog
                    message={alertMsg}
                    onClose={exitDialog}
                />
            ) : null}
            <section
                className=""
                ref={titleSection}
            >
                <div className="reserv-text">
                    <h2 className="aux_title">Reservaciones</h2>

                    <p className='subtitle'>
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
                            value={formData.name}
                        />

                        <input
                            required
                            id="reserv-tel"
                            className="input-control"
                            type="tel"
                            placeholder="Número de teléfono"
                            name="phone"
                            onChange={handleInputChange}
                            value={formData.phone}
                        />

                        <input
                            required
                            name="email"
                            id="reserv-email"
                            type="email"
                            className="input-control"
                            placeholder="Email"
                            onChange={handleInputChange}
                            value={formData.email}
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
                                onChange={handleTimeInput}
                                ref={timeInput}
                                value={formData.hour}
                                min='14:00'
                                max='21:00'
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
                                value={formData.comment}
                            ></textarea>

                            <div className="reserv-button">
                                <input
                                    id="reserv-btn"
                                    type="submit"
                                    className="button-control-round"
                                    value="ENVIAR"
                                    style={sending ? { display: 'none' } : null}
                                />

                                <img
                                    src="/images/loaders/broadcaster.svg"
                                    id="loader"
                                    style={sending ? null : { display: 'none' }}
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
