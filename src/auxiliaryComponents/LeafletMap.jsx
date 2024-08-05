import { useEffect } from "react"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function LeafletMap() {
    const coords = [-16.39885635543751, -71.53528710495644]
    useEffect(() => {
        const map = L.map('map').setView(coords, 17)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: ''
        }).addTo(map)
        L.marker(coords).addTo(map)
        return () => {
            map.remove()
        }
    }, [])
    return (
        <div id="map" className="mapa">
            
        </div>
    )
}

export default LeafletMap
