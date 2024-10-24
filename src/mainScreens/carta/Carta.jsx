import { useState, useEffect, useRef } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import MenuCarousel from './CartaCarousel'
import {
    cartaMapping,
    vinosCategories,
    cartaCategories,
} from '../../../public/cartaUtils'

function Carta({ activateLink }) {
    const mainSection = useRef()
    const scetchSection = useRef()

    const [activeCategory, setActiveCategory] = useState('Platos')
    const [activeWineCategory, setActiveWineCategory] = useState('')
    const [menuItems, setMenuItems] = useState([])
    const [fetchingMenuCollection, setFetchingMenuCollection] = useState(true)
    const [vinosVisible, setVinosVisible] = useState(false)
    const [buildingCarousel, setBuildingCarousel] = useState(false)

    /**
     * Fetch an items collection based on the active category.
     * Map the fetched items to the format needed by the app.
     * Store the formatted items in the state.
     */
    const fetchMenuCollection = async (category) => {
        setBuildingCarousel(false)
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
                    description:
                        doc.data().descripcion ||
                        'Lo sentimos, por el momento la descripción para este producto no está disponible.',
                    price: `S/ ${doc.data().precio}`,
                    imagePath: doc.data().image || 'lg.png',
                }
            })

            setMenuItems(items)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Set the intersection Observer to reveal sections
     */
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

    /**
     * React to the change of the items collection: update the carousel
     */
    useEffect(() => {
        if (!menuItems.length) return
        setBuildingCarousel(true)
    }, [menuItems])

    /**
     * React to the change of the active category: start fetching a new item collection
     */
    useEffect(() => {
        if (activeCategory === 'Vinos') return
        fetchMenuCollection(activeCategory)
    }, [activeCategory])
    useEffect(() => {
        if (!activeWineCategory) return
        fetchMenuCollection(activeWineCategory)
    }, [activeWineCategory])

    /**
     * Handle the clicks on categories: set a new active category
     */
    const activateCategory = (category) => {
        if (activeCategory === category) return

        setActiveCategory(category)
        if (category === 'Vinos') {
            setVinosVisible(true)
        } else {
            setVinosVisible(false)
            setActiveWineCategory('')
        }
    }
    const activateWineCategory = (category) => {
        setActiveWineCategory(category)
    }

    return (
        <div className="main-carta">
            <section
                className="revealable main-carta-section"
                data-first="1"
                ref={mainSection}
            >
                <h2 className="screen-title">Carta</h2>

                <div className="carta-categories">
                    <div className="menu-categories-container">
                        {cartaCategories.map((category) => (
                            <div
                                key={category}
                                className={`menu-category category ${
                                    activeCategory === category ? 'active' : ''
                                }`}
                                onClick={() => activateCategory(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                    <div
                        className={`vinos-container ${
                            vinosVisible ? 'visible' : 'invisible'
                        }`}
                    >
                        {vinosCategories.map((category) => (
                            <div
                                key={category}
                                className={`vino-category ${
                                    activeWineCategory === category
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() => activateWineCategory(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className={`carousel-container ${
                        vinosVisible ? 'translated' : ''
                    }`}
                >
                    <img
                        className="carta-loader"
                        src="/images/loaders/carta.svg"
                        style={
                            fetchingMenuCollection
                                ? { opacity: '1' }
                                : { opacity: '0' }
                        }
                    />

                    {buildingCarousel ? (
                        <MenuCarousel
                            onFetchingCollection={setFetchingMenuCollection}
                            menuItems={menuItems}
                        />
                    ) : null}
                </div>
            </section>

            <section
                ref={scetchSection}
                className="revealable scetch-section"
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
