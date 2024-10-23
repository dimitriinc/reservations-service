import M from 'materialize-css'
import { useEffect, useState, useRef } from 'react'
import CartaItem from './CartaItem'

function CartaCarousel({ onFetchingCollection, menuItems }) {
    const [counter, setCounter] = useState(menuItems.length)
    const [stillBuilding, setStillBuilding] = useState(true)

    const carouselRef = useRef()

    function handleCounterDecrement() {
        setCounter((c) => c - 1)
    }

    useEffect(() => {
        if (counter === 0) {
            M.Carousel.init(carouselRef.current)
            onFetchingCollection(false)
            setStillBuilding(false)
        }
    }, [counter])

    return (
        <div
            className="carousel"
            ref={carouselRef}
            style={stillBuilding ? null : { opacity: '1' }}
        >
            {menuItems.map((item) => (
                <CartaItem
                    key={item.name}
                    item={item}
                    onImageLoad={handleCounterDecrement}
                />
            ))}
        </div>
    )
}

export default CartaCarousel
