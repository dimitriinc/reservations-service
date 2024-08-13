import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertDialog from '../custom/AlertDialog'

function Contacto({ activateLink }) {
    const mainSection = useRef()
    const scetchSection = useRef()
    const bottomSection = useRef()

    const [sending, setSending] = useState(false)
    const [alerting, setAlerting] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [sentSuccess, setSentSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        msg: '',
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (alerting) document.body.classList.add('noscroll')
        else document.body.classList.remove('noscroll')
    }, [alerting])

    useEffect(() => {
        activateLink(5)

        const reveal = function (entries, observer) {
            const [entry] = entries
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed')
                observer.unobserve(entry.target)
            }
        }
        const revealOptions = {
            root: null,
            threshold: 0.15,
        }
        const revealObserver = new IntersectionObserver(reveal, revealOptions)

        Array.of(
            mainSection.current,
            scetchSection.current,
            bottomSection.current
        ).forEach((section) => {
            if (section.dataset.first === '1') {
                setTimeout(() => {
                    revealObserver.observe(section)
                }, 500)
            } else {
                revealObserver.observe(section)
            }
        })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const sendForm = async (e) => {
        e.preventDefault()
        setSending(true)
        try {
            const response = await fetch('https://non-existent-url.net/contact-msg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            setSentSuccess(true)
            setAlertMsg('Gracias por tu mensaje!')
            setSending(false)
            setAlerting(true)
            navigate('/')
        } catch (_) {
            // Dummy response, change when at production
            setTimeout(() => {
                setSentSuccess(true)
                setAlertMsg('Gracias por tu mensaje!')
                setSending(false)
                setAlerting(true)
            }, 2000)
        }
    }

    const exitDialog = () => {
        setAlerting(false)
        document.body.classList.remove('noscroll')
        // if (sentSuccess) navigate('/')
        navigate('/')
    }

    return (
        <div className="main-contact">
            {alerting ? (
                <AlertDialog
                    message={alertMsg}
                    onClose={exitDialog}
                />
            ) : null}
            <section
                className="revealable"
                ref={mainSection}
                data-first="1"
            >
                <h2 className="aux_title">Envíanos un mensaje</h2>

                <p>
                    ¡Háganos saber su opinión! Llene el formulario para enviar
                    su mensaje, solicitud de negocios o simplemente compartir su
                    opinión.
                    <br />
                    ¡Estamos escuchando!
                </p>

                <form
                    id="form-contact"
                    method="post"
                    onSubmit={sendForm}
                >
                    <input
                        id="contact-name"
                        type="text"
                        className="input-control"
                        placeholder="Nombre"
                        name="name"
                        onChange={handleInputChange}
                        required
                    />

                    <input
                        id="contact-email"
                        type="email"
                        className="input-control"
                        placeholder="Email"
                        name="email"
                        onChange={handleInputChange}
                        required
                    />

                    <textarea
                        id="contact-msg"
                        name="msg"
                        rows="7"
                        placeholder="Mensaje"
                        className="input-control"
                        onChange={handleInputChange}
                        required
                    ></textarea>

                    <div className="submit">
                        <input
                            id="contact-submit"
                            type="submit"
                            className="button-control-round"
                            value="enviar"
                            style={sending ? { display: 'none' } : null}
                        />
                        <img
                            src="/images/loaders/broadcaster.svg"
                            id="loader"
                            style={sending ? null : { display: 'none' }}
                        />
                    </div>
                </form>
            </section>

            <section
                className="revealable"
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
                className="bottom-image revealable"
                ref={bottomSection}
            ></section>
        </div>
    )
}

export default Contacto
