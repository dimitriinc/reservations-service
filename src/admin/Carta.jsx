import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import CartaItem from './CartaItem'
import { cartaCategories, vinosCategories, cartaMapping } from '../../public/cartaUtils'

function Carta() {
    const [activeCategory, setActiveCategory] = useState('Platos')
    const [activeVineCategory, setActiveVineCategory] = useState('')
    const [cartaLoading, setCartaLoading] = useState(true)
    const [categoryItems, setCategoryItems] = useState([])
    const [vinosSelectorVisible, setVinosSelectorVisible] = useState(false)

    function handleCategoryChange(e) {
        if (e.target.value === 'Vinos') {
            if (!vinosSelectorVisible) {
                setVinosSelectorVisible(true)
                setCartaLoading(true)
                setActiveCategory('Vinos')
                setActiveVineCategory('Tintos')
                return
            } else return
        } else {
            setActiveVineCategory('')
            setVinosSelectorVisible(false)
        }
        setCartaLoading(true)
        setActiveCategory(e.target.value)
    }

    function handleVineCategoryChange(e) {
        setCartaLoading(true)
        setActiveVineCategory(e.target.value)
    }

    async function fetchCategory(category) {
        const q = query(
            collection(db, cartaMapping[category]),
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
        if (activeCategory === 'Vinos') return
        fetchCategory(activeCategory)
    }, [activeCategory])

    useEffect(() => {
        if (!activeVineCategory) return
        fetchCategory(activeVineCategory)
    }, [activeVineCategory])

    useEffect(() => {
        if (categoryItems.length) {
            setCartaLoading(false)
        }
    }, [categoryItems])

    return (
        <>
            <div className="admin-actions">
                <div className="carta-selectors">
                    <select
                        value={activeCategory}
                        onChange={handleCategoryChange}
                        className="carta-selector"
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
                    {vinosSelectorVisible && (
                        <select
                            value={activeVineCategory}
                            onChange={handleVineCategoryChange}
                            className={`carta-selector`}
                        >
                            {vinosCategories.map((category) => {
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
                    )}
                </div>
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
