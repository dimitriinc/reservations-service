import LeafletMap from '../auxiliaryComponents/LeafletMap'
import { useRef, useEffect } from 'react'

function Horario({ activateLink }) {
    const mainSection = useRef()
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
                    <h2 className="aux_title">Horarios &amp; Ubicación</h2>

                    <p>
                        <a href="">
                            calle Mercaderes, 142
                            <br />
                            Arequipa
                        </a>
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
