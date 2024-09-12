import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import marker from '/images/marker.png'

// delete L.Icon.Default.prototype._getIconUrl

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// })

function LeafletMap() {
    const coords = [-16.39885635543751, -71.53528710495644]
    useEffect(() => {
        const map = L.map('map').setView(coords, 17)
        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
                attribution: '',
            }
        ).addTo(map)

        const customIcon = new L.Icon({
            iconUrl: marker,
            iconSize: [75, 75],
            iconAnchor:[38, 20],
            popupAnchor: [0, -32]
        })

        L.marker(coords, { icon: customIcon }).addTo(map)
        return () => {
            map.remove()
        }
    }, [])
    return (
        <div className="map-container">
            <div
                id="map"
                className="mapa centered"
            ></div>
        </div>
    )
}

export default LeafletMap
