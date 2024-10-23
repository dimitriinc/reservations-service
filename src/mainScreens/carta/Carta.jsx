import { useState, useEffect, useRef } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import MenuCarousel from '../../custom/MenuCarousel'
import { cartaMapping } from '../../../public/cartaUtils'

function Carta({ activateLink }) {
    const mainSection = useRef()
    const scetchSection = useRef()

    const [activeCategory, setActiveCategory] = useState('Platos')
    const [activeWineCategory, setActiveWineCategory] = useState('')
    const [menuItems, setMenuItems] = useState([])
    const [fetchingMenuCollection, setFetchingMenuCollection] = useState(true)
    const [vinosVisible, setVinosVisible] = useState(false)
    const [menuReady, setMenuReady] = useState(false)

    const fetchMenuCollection = async (category) => {
        setFetchingMenuCollection(true)
        const q = query(
            collection(db, cartaMapping[category]),
            where('isPresent', '==', true),
            orderBy('nombre')
        )
        try {
            const snapshot = await getDocs(q)
            const items = snapshot.docs.map((doc) => {
                return {
                    name: doc.data().nombre,
                    description: doc.data().descripcion,
                    price: doc.data().precio,
                    imagePath: doc.data().image,
                }
            })

            setMenuItems(items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        activateLink(2)

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

    useEffect(() => {
        if (!menuItems.length) return
        setFetchingMenuCollection(false)
        console.log(menuItems)
    }, [menuItems])

    useEffect(() => {
        if (activeCategory === 'Vinos') return
        fetchMenuCollection(activeCategory)
    }, [activeCategory])

    useEffect(() => {
        if (!activeWineCategory) return
        fetchMenuCollection(activeWineCategory)
    }, [activeWineCategory])

    const activateCategory = (category) => {
        if (activeCategory === category) return

        setActiveCategory(category)
        if (category === 'Vinos') {
            setVinosVisible(true)
        } else {
            setVinosVisible(false)
        }
    }

    const activateWineCategory = (category) => {
        setActiveWineCategory(category)
    }

    return (
        <div className="main-carta">
            <section
                className="revealable"
                data-first="1"
                ref={mainSection}
            >
                <h2 className="screen-title">Carta</h2>

                <div className="categories-carousel">
                    <div className="menu-categories-container">
                        <div
                            className={`menu-category category ${
                                activeCategory === 'Platos' ? 'active' : ''
                            }`}
                            onClick={() => activateCategory('Platos')}
                        >
                            Platos
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'Piqueos' ? 'active' : ''
                            }`}
                            onClick={() => activateCategory('Piqueos')}
                        >
                            Piqueos
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'Vinos' ? 'active' : ''
                            }`}
                            onClick={() => activateCategory('Vinos')}
                        >
                            Vinos
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'Cocteles' ? 'active' : ''
                            }`}
                            onClick={() => activateCategory('Cocteles')}
                        >
                            Cocteles
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'Cervezas' ? 'active' : ''
                            }`}
                            onClick={() => activateCategory('Cervezas')}
                        >
                            Cervezas
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'Bebidas' ? 'active' : ''
                            }`}
                            onClick={() => activateCategory('Bebidas')}
                        >
                            Bebidas
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'Postres' ? 'active' : ''
                            }`}
                            onClick={() => activateCategory('Postres')}
                        >
                            Postres
                        </div>
                        <div
                            className={`menu-category category ${
                                activeCategory === 'Ofertas' ? 'active' : ''
                            }`}
                            onClick={() => activateCategory('Ofertas')}
                        >
                            Ofertas
                        </div>
                    </div>
                </div>

                <div
                    className={`vinos-container ${
                        vinosVisible ? 'visible' : 'invisible'
                    }`}
                >
                    <div
                        className={`vino-category category wine ${
                            activeWineCategory === 'Tintos' ? 'active' : ''
                        }`}
                        onClick={() => activateWineCategory('Tintos')}
                    >
                        Tintos
                    </div>
                    <div
                        className={`vino-category category wine ${
                            activeWineCategory === 'Blancos' ? 'active' : ''
                        }`}
                        onClick={() => activateWineCategory('Blancos')}
                    >
                        Blancos
                    </div>
                    <div
                        className={`vino-category category wine ${
                            activeWineCategory === 'Rosé' ? 'active' : ''
                        }`}
                        onClick={() => activateWineCategory('Rosé')}
                    >
                        Rosé
                    </div>
                    <div
                        className={`vino-category category wine ${
                            activeWineCategory === 'Postre' ? 'active' : ''
                        }`}
                        onClick={() => activateWineCategory('Postre')}
                    >
                        Postre
                    </div>
                    <div
                        className={`vino-category category wine ${
                            activeWineCategory === 'Copas' ? 'active' : ''
                        }`}
                        onClick={() => activateWineCategory('Copas')}
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
                                menuCollection={menuItems}
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
