import { useState, useEffect, useRef } from 'react'

function Signup() {
    const mainSection = useRef()
    const bottomSection = useRef()
    const scetchSection = useRef()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })
    const [errorMsg, setErrorMsg] = useState('')
    const [sending, setSending] = useState(false)
    const [alerting, setAlerting] = useState(false)

    useEffect(() => {
        if (alerting) document.body.classList.add('noscroll')
        else document.body.classList.remove('noscroll')
    }, [alerting])

    useEffect(() => {
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
                'https://15e9-190-238-135-197.ngrok-free.app/signup',
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
                alert(text)
                setSending(!sending)
            } else {
                alert(text)
                window.location.href = '/'
            }
        } catch (_) {
            setTimeout(() => {
                setSending(false)
                setErrorMsg(
                    'Lo sentimos, ha ocurrido un error al procesar su solicitud.\nPor favor, inténtelo de nuevo más tarde.'
                )
                setAlerting(true)
            }, 2000)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const exitDialog = () => {
        setAlerting(false)
    }

    return (
        <div className="main-signup">
            <div
                className="overlay"
                style={
                    alerting
                        ? null
                        : {
                              display: 'none',
                          }
                }
            >
                <div className='centered dialog'>
                    <p style={{
                        padding: '2rem'
                    }}>{errorMsg}</p>
                    <button onClick={exitDialog}>OK</button>
                </div>
            </div>

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
                        onChange={handleChange}
                        required
                    />
                    <input
                        id="signup-email"
                        type="email"
                        className="input-control-round"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
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
                    src="/images/scetches/hangingChair.png"
                    className="centered"
                    style={{
                        height: '300px',
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
