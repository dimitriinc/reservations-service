import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import { useState } from 'react'

function CartaItem({ item, onImageLoad }) {
    const [imgURL, setImgURL] = useState('')
    const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 })
    const [flipped, setFlipped] = useState(false)

    const imgRef = ref(storage, item.imagePath)
    fetchDownloadUrl(imgRef)

    async function fetchDownloadUrl(imgRef) {
        const imgURL = await getDownloadURL(imgRef)
        setImgURL(imgURL)
    }

    function handleMouseDown(event) {
        setCursorCoords((coords) => ({
            ...coords,
            x: event.clientX,
            y: event.clientY,
        }))
    }

    function handleMouseUp(event) {
        const xDiff = event.clientX - cursorCoords.x
        const yDiff = event.clientY - cursorCoords.y
        const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff)

        if (
            distance < 10 &&
            event.target.closest('.carousel-item').classList.contains('active')
        ) {
            setFlipped((v) => !v)
        }
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="carousel-item"
        >
            <div className={`card ${flipped ? 'flipped' : ''}`}>
                <div className="front">
                    <div className="item-title-container">
                        <div className="item-title">{item.name}</div>
                    </div>
                    {imgURL ? (
                        <img
                            alt={item.name}
                            src={imgURL}
                            onLoad={onImageLoad}
                        ></img>
                    ) : null}
                </div>
                <div className="back">
                    <div className="item-title-container">
                        <div className="item-title">{item.name}</div>
                    </div>
                    <div className="item-specs">
                        <p className="item-description">{item.description}</p>
                        <div className="item-price">
                            <em>{item.price}</em>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartaItem
