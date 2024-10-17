import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import CartaItem from './CartaItem'

const cartaCategories = [
    'Platos',
    'Piqueos',
    'Vinos',
    'Cocteles',
    'Cervezas',
    'Bebidas',
    'Postres',
    'Ofertas',
]

const cartaMapping = {
    Platos: 'menu/01.platos/platos',
    Piqueos: 'menu/02.piqueos/piqueos',
    Vinos: 'menu/03.vinos/vinos',
    Cocteles: 'menu/04.cocteles/cocteles',
    Cervezas: 'menu/05.cervezas/cervezas',
    Bebidas: 'menu/06.bebidas calientes/bebidas calientes',
    Postres: 'menu/061.postres/postres',
    Ofertas: 'menu/07.ofertas/ofertas',
}

function Carta() {
    const [activeCategory, setActiveCategory] = useState('Platos')
    const [cartaLoading, setCartaLoading] = useState(false)
    const [categoryItems, setCategoryItems] = useState([])

    function handleCategoryChange(e) {
        setCartaLoading(true)
        setActiveCategory(e.target.value)
    }

    async function fetchCategory() {
        const q = query(
            collection(db, cartaMapping[activeCategory]),
            orderBy('nombre')
        )
        try {
            const snapshot = await getDocs(q)
            const items = snapshot.docs.map((doc) => {
                return {
                    path: doc.ref.path,
                    name: doc.data().nombre,
                    isPresent: doc.data().isPresent,
                }
            })

            setCategoryItems(items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [activeCategory])

    useEffect(() => {
        if (categoryItems.length) {
            setCartaLoading(false)
        }
    }, [categoryItems])

    return (
        <>
            <div className="admin-actions">
                <select
                    value={activeCategory}
                    onChange={handleCategoryChange}
                >
                    {cartaCategories.map((category) => {
                        return (
                            <option
                                value={category}
                                key={category}
                            >
                                {category}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div className="carta-main">
                <img
                    className={`carta-loader ${
                        cartaLoading ? 'visible' : 'invisible'
                    }`}
                    src="/images/loaders/reservations.svg"
                    alt="loader"
                />
                <div
                    className={`category-container ${
                        cartaLoading ? 'invisible' : 'visible'
                    }`}
                >
                    <h4 className="category-label">{activeCategory}</h4>
                    <ul className="category-content">
                        {categoryItems.map((item) => (
                            <CartaItem
                                item={item}
                                key={item.name}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Carta
