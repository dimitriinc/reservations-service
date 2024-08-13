import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertDialog from '../custom/AlertDialog'

function Signup({ activateLink }) {
    const mainSection = useRef()
    const bottomSection = useRef()
    const scetchSection = useRef()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })
    const [alertMsg, setAlertMsg] = useState('')
    const [sending, setSending] = useState(false)
    const [alerting, setAlerting] = useState(false)
    const [signupSuccess, setSignupSuccess] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (alerting) document.body.classList.add('noscroll')
        else document.body.classList.remove('noscroll')
    }, [alerting])

    useEffect(() => {
        activateLink(6)

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

    const sendForm = async (e) => {
        e.preventDefault()
        setSending(true)
        try {
            const response = await fetch(
                'https://non-existent-url.net/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            const text = await response.text()

            if (response.status === 201) {
                setSending(false)
                setAlertMsg(text)
                setAlerting(true)
            } else {
                setSending(false)
                setSignupSuccess(true)
                setAlertMsg(text)
                setAlerting(true)
            }
        } catch (_) {
            // Dummy response, change when at production
            setTimeout(() => {
                setSending(false)
                setAlertMsg('La inscripción exitosa!')
                setAlerting(true)
            }, 2000)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const exitDialog = () => {
        setAlerting(false)
        document.body.classList.remove('noscroll')
        // if (signupSuccess) navigate('/')
        navigate('/')
    }

    return (
        <div className="main-signup">
            {alerting ? (
                <AlertDialog
                    message={alertMsg}
                    onClose={exitDialog}
                />
            ) : null}
            <section
                className="revealable"
                data-first="1"
                ref={mainSection}
            >
                <h2 className="aux_title">lista de envío</h2>

                <p>
                    Manténgase informado sobre nuestras noticias, ofertas y
                    eventos
                </p>

                <form
                    method="post"
                    id="signup-form"
                    onSubmit={sendForm}
                >
                    <input
                        id="signup-name"
                        type="text"
                        className="input-control-round"
                        name="name"
                        placeholder="Nombre"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        id="signup-email"
                        type="email"
                        className="input-control-round"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        id="signup-submit-btn"
                        type="submit"
                        className="button-control-round signup-btn"
                        value="inscribirse"
                        style={sending ? { display: 'none' } : null}
                    />
                    <img
                        src="/images/loaders/broadcaster.svg"
                        id="loader"
                        style={sending ? null : { display: 'none' }}
                    />
                </form>
            </section>
            <section
                className="revealable"
                ref={scetchSection}
            >
                <img
                    src="/images/scetches/hangingChair_noise.png"
                    className="centered"
                    style={{
                        height: '310px',
                        width: '200px',
                        marginBottom: '2rem',
                    }}
                />
            </section>
            <section
                className="revealable"
                ref={bottomSection}
            >
                <div className="bottom-image"></div>
            </section>
        </div>
    )
}

export default Signup
