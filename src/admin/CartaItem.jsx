import { useState } from 'react'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'

function CartaItem({ item }) {
    const [checked, setChecked] = useState(item.isPresent)

    async function handleItemChecked(e) {
        setChecked((c) => !c)
        try {
            await updateDoc(doc(db, item.path), { isPresent: !checked })
            console.log(`${item.name} updated successfully!`)
        } catch (error) {
            console.log(`${item.name} wasn't updated. Error: ${error}`)
        }
    }
    return (
        <li className="centered">
            <span className="dish-name">{item.name}</span>
            <span
                className={`switch ${checked && 'checked'}`}
                onClick={handleItemChecked}
            ></span>
        </li>
    )
}

export default CartaItem
