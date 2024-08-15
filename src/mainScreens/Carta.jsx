import { useState, useEffect, useRef } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import MenuCarousel from '../custom/MenuCarousel'

function Carta({ activateLink }) {
    const mainSection = useRef()
    const scetchSection = useRef()

    const [collectionPath, setCollectionPath] = useState(
        'menu/01.platos/platos'
    )
    const [activeCategory, setActiveCategory] = useState('platos')
    const [activeWineCategory, setActiveWineCategory] = useState('')
    const [menuCollection, setMenuCollection] = useState([])
    const [fetchingMenuCollection, setFetchingMenuCollection] = useState(true)
    const [vinosVisible, setVinosVisible] = useState(false)
    const [menuReady, setMenuReady] = useState(false)

    const fetchMenuCollection = async () => {
        console.log('fetching starts...')
        setFetchingMenuCollection(true)
        console.log(`Collection path: ${collectionPath}`)
        const q = query(
            collection(db, collectionPath),
            where('isPresent', '==', true),
            orderBy('nombre')
        )
        try {
            const snapshot = await getDocs(q)
            const plates = snapshot.docs.map((doc) => {
                // console.log(doc.data().nombre)
                return doc.data().nombre
            })
            setMenuCollection([...plates])
            setFetchingMenuCollection(false)

            // Temporal
            menuCollection.forEach((document) => console.log(document))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        activateLink(2)

        fetchMenuCollection()

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

    useEffect(() => fetchMenuCollection, [collectionPath])

    const activateCategory = (event) => {
        const category = event.target.dataset.id
        if (activeCategory === category) return

        setActiveCategory(category)
        if (category === 'vinos') {
            setVinosVisible(true)
        } else {
            setVinosVisible(false)
            const dbPath = event.target.dataset.dbPath
            setCollectionPath(dbPath)
        }
    }

    const activateWineCategory = (event) => {
        const category = event.target.dataset.id
        setActiveWineCategory(category)
        const dbPath = event.target.dataset.dbPath
        setCollectionPath(dbPath)
    }

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
                            className={`menu-category category ${
                                activeCategory === 'platos' ? 'active' : ''
                            }`}
                            data-id="platos"
                            data-db-path="menu/01.platos/platos"
                            onClick={activateCategory}
                        >
                            Platos
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'piqueos' ? 'active' : ''
                            }`}
                            data-id="piqueos"
                            data-db-path="menu/02.piqueos/piqueos"
                            onClick={activateCategory}
                        >
                            Piqueos
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'vinos' ? 'active' : ''
                            }`}
                            data-id="vinos"
                            data-db-path="menu/03.vinos/vinos"
                            onClick={activateCategory}
                        >
                            Vinos
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'cocteles' ? 'active' : ''
                            }`}
                            data-id="cocteles"
                            data-db-path="menu/04.cocteles/cocteles"
                            onClick={activateCategory}
                        >
                            Cocteles
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'cervezas' ? 'active' : ''
                            }`}
                            data-id="cervezas"
                            data-db-path="menu/05.cervezas/cervezas"
                            onClick={activateCategory}
                        >
                            Cervezas
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'bebidas calientes'
                                    ? 'active'
                                    : ''
                            }`}
                            data-id="bebidas calientes"
                            data-db-path="menu/06.bebidas calientes/bebidas calientes"
                            onClick={activateCategory}
                        >
                            Bebidas calientes
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'postres' ? 'active' : ''
                            }`}
                            data-id="postres"
                            data-db-path="menu/061.postres/postres"
                            onClick={activateCategory}
                        >
                            Postres
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'ofertas' ? 'active' : ''
                            }`}
                            data-id="ofertas"
                            data-db-path="menu/07.ofertas/ofertas"
                            onClick={activateCategory}
                        >
                            Ofertas
                        </div>
                    </div>
                </div>

                <div
                    className={`vinos-container ${
                        vinosVisible ? 'visible' : 'hidden'
                    }`}
                >
                    <div
                        data-db-path="menu/03.vinos/vinos/Vinos tintos/vinos"
                        className={`vino-category category wine ${
                            activeWineCategory === 'tintos' ? 'active' : ''
                        }`}
                        data-id="tintos"
                        onClick={activateWineCategory}
                    >
                        Tintos
                    </div>
                    <div
                        data-db-path="menu/03.vinos/vinos/Vinos blancos/vinos"
                        className={`vino-category category wine ${
                            activeWineCategory === 'blancos' ? 'active' : ''
                        }`}
                        data-id="blancos"
                        onClick={activateWineCategory}
                    >
                        Blancos
                    </div>
                    <div
                        data-db-path="menu/03.vinos/vinos/Vinos rose/vinos"
                        className={`vino-category category wine ${
                            activeWineCategory === 'rose' ? 'active' : ''
                        }`}
                        data-id="rose"
                        onClick={activateWineCategory}
                    >
                        Rosé
                    </div>
                    <div
                        data-db-path="menu/03.vinos/vinos/Vinos de postre/vinos"
                        className={`vino-category category wine ${
                            activeWineCategory === 'postre' ? 'active' : ''
                        }`}
                        data-id="postre"
                        onClick={activateWineCategory}
                    >
                        Postre
                    </div>
                    <div
                        data-db-path="menu/03.vinos/vinos/Vinos por copa/vinos"
                        className={`vino-category category wine ${
                            activeWineCategory === 'copas' ? 'active' : ''
                        }`}
                        data-id="copas"
                        onClick={activateWineCategory}
                    >
                        Copas
                    </div>
                </div>

                <div
                    className={`carousel-container ${
                        vinosVisible ? 'translated' : ''
                    }`}
                >
                    <img
                        className="carta-load-anim"
                        src="/images/loaders/carta.svg"
                        style={
                            fetchingMenuCollection
                                ? { opacity: '1' }
                                : { opacity: '0' }
                        }
                    />

                    <div
                        className="carousel"
                        style={
                            fetchingMenuCollection
                                ? { opacity: '0' }
                                : { opacity: '1' }
                        }
                    >
                        {menuReady ? (
                            <MenuCarousel
                                setMenuReady={setMenuReady}
                                menuCollection={menuCollection}
                            />
                        ) : null}
                    </div>
                </div>
            </section>
            <section
                ref={scetchSection}
                className="revealable"
            >
                <img
                    id="carta-scetch"
                    src="/images/scetches/plants.png"
                    style={{
                        marginBottom: '2rem',
                    }}
                />
            </section>
        </div>
    )
}

export default Carta
