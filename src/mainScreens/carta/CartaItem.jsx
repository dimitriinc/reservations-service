import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import { useState } from 'react'

function CartaItem({ item, onImageLoad }) {
    const [imgURL, setImgURL] = useState('')

    const imgRef = ref(storage, item.imagePath)
    fetchDownloadUrl(imgRef)

    async function fetchDownloadUrl(imgRef) {
        const imgURL = await getDownloadURL(imgRef)
        setImgURL(imgURL)
    }

    return (
        <div className="carousel-item">
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
    )
}

export default CartaItem
