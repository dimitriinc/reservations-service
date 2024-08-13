import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertDialog from '../custom/AlertDialog'

function Carreras({ activateLink }) {
    const mainSection = useRef()
    const scetchSection = useRef()
    const bottomSection = useRef()
    const fileInput = useRef()

    const [sending, setSending] = useState(false)
    const [alerting, setAlerting] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [applySuccess, setApplySuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        tel: '',
        position: '',
        letter: '',
        cv: null,
    })
    const [fileInputDisplay, setFileInputDisplay] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (alerting) document.body.classList.add('noscroll')
        else document.body.classList.remove('noscroll')
    }, [alerting])

    useEffect(() => {
        // Set the file display text if the file is selected
        if (fileInput.current.value)
            setFileInputDisplay(fileInput.current.files[0].name)

        // Set the active link to Carreras
        activateLink(4)

        // Handle the observers
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

    const onFileInputClick = () => {
        fileInput.current.click()
    }

    const onFileSelectedChange = (e) => {
        const file = e.target.files[0]
        const fileName = file.name
        const fileExtension = fileName.split('.').pop().toLowerCase()
        const fileSize = file.size

        if (fileExtension === 'pdf') {
            if (fileSize > 5242880) {
                setFileInputDisplay('El tamaño no puede ser más de 5MB')
                e.target.value = ''
            } else {
                setFileInputDisplay(fileName)
                setFormData({
                    ...formData,
                    cv: file,
                })
            }
        } else {
            setFileInputDisplay('Por favor, selecciona un archivo PDF')
            e.target.value = ''
        }
    }

    const sendForm = async (e) => {
        e.preventDefault()

        if (!fileInput.current.value) {
            setFileInputDisplay('El archivo no está seleccionado \u2757')
            return
        }

        setSending(true)

        try {
            await fetch(`https://non-existent-url.net/job-application`, {
                method: 'POST',
                body: formData,
            })

            setAlertMsg('Gracias por tu solicitud! Nos contactaremos pronto.')
            setSending(false)
            setAlerting(true)
        } catch (_) {
            // Dummy response, change when at production
            setTimeout(() => {
                setApplySuccess(true)
                setAlertMsg(
                    'Gracias por tu solicitud! Nos contactaremos pronto.'
                )
                setSending(false)
                setAlerting(true)
            }, 2000)
        }
    }

    const exitDialog = () => {
        setAlerting(false)
        document.body.classList.remove('noscroll')
        // if (applySuccess) navigate('/')
        navigate('/')
    }

    return (
        <div className="main-jobs">
            {alerting ? (
                <AlertDialog
                    message={alertMsg}
                    onClose={exitDialog}
                />
            ) : null}
            <section
                ref={mainSection}
                data-first="1"
                className="revealable"
            >
                <h2 className="aux_title">Trabaja con nosotros</h2>

                <p>
                    Si está interesado en formar parte de nuestro equipo
                    dinámico y apasionado, simplemente complete el formulario a
                    continuación con su información y envíelo. ¡Nos encantará
                    conocerlo!
                </p>

                <form
                    id="form-jobs"
                    method="post"
                    onSubmit={sendForm}
                >
                    <input
                        id="jobs-name"
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        className="input-control"
                        onChange={handleInputChange}
                        required
                    />

                    <input
                        id="jobs-tel"
                        type="tel"
                        name="tel"
                        placeholder="Número de teléfono"
                        className="input-control"
                        onChange={handleInputChange}
                        required
                    />

                    <select
                        name="position"
                        className="input-control"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                        style={formData.position ? null : { color: 'grey' }}
                    >
                        <option
                            value=""
                            disabled
                            hidden
                        >
                            Posición deseada
                        </option>
                        <option value="mesero">Mesero</option>
                        <option value="bartender">Bartender</option>
                        <option value="cocinero">Cocinero</option>
                    </select>

                    <textarea
                        id="jobs-carta"
                        name="letter"
                        placeholder="Carta titular"
                        rows="10"
                        className="input-control"
                        onChange={handleInputChange}
                        required
                    ></textarea>

                    <div className="input-file">
                        <div className="input-file-text">
                            Curriculum Vitae - <em>en el formato PDF</em>
                        </div>

                        <input
                            id="file-pdf"
                            type="file"
                            accept="application/pdf"
                            name="cv"
                            ref={fileInput}
                            onChange={onFileSelectedChange}
                        />

                        <div className="input-file-receiver">
                            <div
                                className="input-file-receiver-btn"
                                onClick={onFileInputClick}
                            >
                                Seleccionar archivo
                            </div>
                            <div className="input-file-receiver-selected">
                                <em>{fileInputDisplay}</em>
                            </div>
                        </div>
                    </div>

                    <div className="submit">
                        <input
                            id="jobs-submit"
                            type="submit"
                            className="button-control-round"
                            value="aplicar"
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
                    src="/images/scetches/bureau_noise.png"
                    className="centered"
                    style={{
                        height: '210px',
                        width: '300px',
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

export default Carreras
