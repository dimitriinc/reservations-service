import LeafletMap from '../custom/LeafletMap'
import { useRef, useEffect } from 'react'

function Horario({ activateLink }) {
    const mainSection = useRef()
    const mapSection = useRef()
    const bottomSection = useRef()
    const scetchSection = useRef()

    useEffect(() => {
        activateLink(1)

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
            mapSection.current,
            bottomSection.current,
            scetchSection.current
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

    return (
        <div className="main-hours">
            <section
                ref={mainSection}
                className="revealable"
                data-first="1"
            >
                <div className="horas">
                    <h2 className="screen-title">Horarios &amp; Ubicación</h2>

                    <p className="ubicacion">
                        calle Mercaderes, 142
                        <br />
                        Arequipa
                    </p>

                    <p>
                        <strong>Atención</strong>
                        <br />
                        De lunes a sábado
                        <br />
                        2&#8212;10PM
                    </p>

                    <p>
                        <strong>Happy Hour</strong>
                        <br />
                        De lunes a sábado
                        <br />
                        2&#8212;6PM
                    </p>
                </div>
            </section>

            <section
                ref={mapSection}
                className="revealable"
            >
                <LeafletMap />
            </section>

            <section
                ref={scetchSection}
                className="revealable"
            >
                <img src="/images/scetches/chairs_noise.png" />
            </section>

            <section
                ref={bottomSection}
                className="bottom-image revealable"
            ></section>
        </div>
    )
}

export default Horario
