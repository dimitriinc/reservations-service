import { useState, useRef, useEffect } from 'react'
import dummyReservas from './reservas.json'
import Reserva from './Reserva'

dummyReservas.sort((a, b) => {
    if (a.confirmed < b.confirmed) return -1
    if (a.confirmed > b.confirmed) return 1
    return a.arrivalTimestamp - b.arrivalTimestamp
})

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

function Reservas() {
    const [reservasLoading, setReservasLoading] = useState(true)
    const [currentDate, setCurrentDate] = useState(today)
    const [currentDateString, setCurrentDateString] = useState('')
    const [specialButtonText, setSpecialButtonText] = useState('mañana')
    const [pendientesMode, setPendientesMode] = useState(false)
    const [hayReservas, setHayReservas] = useState(true)

    const datePicker = useRef()

    useEffect(() => {
        setCurrentDateString(constructDate(today))
        loadReservas()
    }, [])

    useEffect(() => {
        setPendientesMode(false)
        setReservasLoading(true)
        setCurrentDateString(constructDate(currentDate))
        loadReservas()
    }, [currentDate])

    const loadReservas = () => {
        // Dummy
        setTimeout(() => {
            setReservasLoading(false)
            setHayReservas(true)
        }, 3000)
    }

    const constructDate = (date) =>
        `${String(date.getDate()).padStart(2, 0)}/${String(
            date.getMonth() + 1
        ).padStart(2, 0)}/${date.getFullYear()}`

    const handleSpecialButton = () => {
        if (specialButtonText === 'mañana') {
            setCurrentDate(tomorrow)
            setSpecialButtonText('hoy')
        }
        if (specialButtonText === 'hoy') {
            setCurrentDate(today)
            setSpecialButtonText('mañana')
        }
    }

    const handleCalendar = () => {
        datePicker.current.showPicker()
    }

    const setDateFromCalendar = (e) => {
        const date = new Date(e.target.value)
        date.setHours(date.getHours() + 5)
        if (
            date.getDate() === today.getDate() &&
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth()
        ) {
            setSpecialButtonText('mañana')
        } else {
            setSpecialButtonText('hoy')
        }
        setCurrentDate(date)
    }

    const handlePendientes = () => {
        setPendientesMode(true)
        setReservasLoading(true)
        setSpecialButtonText('hoy')

        //Dummy
        setTimeout(() => {
            dummyReservas.forEach((reserva) => {
                reserva.date = constructDate(new Date(reserva.arrivalTimestamp))
            })
            setReservasLoading(false)
        }, 3000)
    }

    return (
        <>
            <div className="admin-actions">
                <button
                    id="tomorrow-btn"
                    onClick={handleSpecialButton}
                >
                    {specialButtonText}
                </button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width={42}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    onClick={handleCalendar}
                    className="calendar"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                </svg>

                <button
                    className="pendientes"
                    onClick={handlePendientes}
                >
                    pendientes
                </button>
                <input
                    type="date"
                    hidden={true}
                    ref={datePicker}
                    onChange={setDateFromCalendar}
                />
            </div>

            <main className="main-admin">
                <div className="reservations-main">
                    {pendientesMode ? null : (
                        <h3 id="reservations-date">{currentDateString}</h3>
                    )}

                    <img
                        id="reservations-loader"
                        className={reservasLoading ? 'visible' : 'invisible'}
                        src="/images/loaders/reservations.svg"
                        alt="loader"
                    />

                    <div
                        id="error-message"
                        className={`${
                            hayReservas ? 'invisible' : 'visible'
                        } centered`}
                    >
                        No hay reservas
                    </div>

                    {hayReservas && !pendientesMode && (
                        <div
                            className={`reservations-container ${
                                reservasLoading ? 'invisible' : 'visible'
                            }`}
                        >
                            {dummyReservas.map((reserva) => (
                                <Reserva
                                    reserva={reserva}
                                    key={reserva.id}
                                    pendiente={false}
                                />
                            ))}
                        </div>
                    )}

                    {hayReservas && pendientesMode && (
                        <div
                            className={`reservations-container ${
                                reservasLoading ? 'invisible' : 'visible'
                            }`}
                        >
                            {dummyReservas
                                .filter((reserva) => !reserva.confirmed)
                                .map((reserva) => (
                                    <Reserva
                                        reserva={reserva}
                                        key={reserva.id}
                                        pendiente={true}
                                    />
                                ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}

export default Reservas
