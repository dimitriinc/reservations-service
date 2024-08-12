import { useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

async function fetchMenuCollection(collectionName) {
    const snapshot = await getDocs(collection(db, collectionName))
    const plates = snapshot.docs.map(doc => doc.data())
    plates.forEach((document) => {
        console.log(document.nombre)
    })
}

function Carta({ activateLink }) {
    const mainSection = useRef()
    const scetchSection = useRef()

    useEffect(() => {
        activateLink(2)

        fetchMenuCollection('menu/061.postres/postres')

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

        Array.of(mainSection.current, scetchSection.current).forEach(
            (section) => {
                if (section.dataset.first === '1') {
                    setTimeout(() => {
                        revealObserver.observe(section)
                    }, 500)
                } else {
                    revealObserver.observe(section)
                }
            }
        )
    }, [])

    return (
        <div className="main-carta">
            <section
                className="revealable"
                data-first="1"
                ref={mainSection}
            >
                <h2 className="aux_title">Carta</h2>

                <div className="categories-carousel">
                    <div className="menu-categories-container">
                        <div
                            className="menu-category category active"
                            data-db-path="menu/01.platos/platos"
                        >
                            Platos
                        </div>
                        <div
                            className="menu-category category"
                            data-db-path="menu/02.piqueos/piqueos"
                        >
                            Piqueos
                        </div>
                        <div
                            className="menu-category category"
                            data-db-path="menu/03.vinos/vinos"
                        >
                            Vinos
                        </div>
                        <div
                            className="menu-category category"
                            data-db-path="menu/04.cocteles/cocteles"
                        >
                            Cocteles
                        </div>
                        <div
                            className="menu-category category"
                            data-db-path="menu/05.cervezas/cervezas"
                        >
                            Cervezas
                        </div>
                        <div
                            className="menu-category category"
                            data-db-path="menu/06.bebidas calientes/bebidas calientes"
                        >
                            Bebidas calientes
                        </div>
                        <div
                            className="menu-category category"
                            data-db-path="menu/061.postres/postres"
                        >
                            Postres
                        </div>
                        <div
                            className="menu-category category"
                            data-db-path="menu/07.ofertas/ofertas"
                        >
                            Ofertas
                        </div>
                    </div>
                </div>

                <div className="vinos-container hidden">
                    <div
                        className="vino-category category wine"
                        data-db-path="menu/03.vinos/vinos/Vinos tintos/vinos"
                    >
                        Tintos
                    </div>
                    <div
                        className="vino-category category wine"
                        data-db-path="menu/03.vinos/vinos/Vinos blancos/vinos"
                    >
                        Blancos
                    </div>
                    <div
                        className="vino-category category wine"
                        data-db-path="menu/03.vinos/vinos/Vinos rose/vinos"
                    >
                        Rosé
                    </div>
                    <div
                        className="vino-category category wine"
                        data-db-path="menu/03.vinos/vinos/Vinos de postre/vinos"
                    >
                        Postre
                    </div>
                    <div
                        className="vino-category category wine"
                        data-db-path="menu/03.vinos/vinos/Vinos por copa/vinos"
                    >
                        Copas
                    </div>
                </div>

                <div className="carousel-container">
                    <img
                        className="carta-load-anim"
                        src="/images/loaders/carta.svg"
                    />

                    <div className="carousel"></div>
                </div>
            </section>
            <section
                ref={scetchSection}
                className="revealable"
            >
                <img
                    src="/images/scetches/barScene.png"
                    style={{
                        height: '210px',
                        width: '300px',
                        marginBottom: '2rem',
                    }}
                />
            </section>
        </div>
    )
}

export default Carta
