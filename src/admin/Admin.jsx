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

function Admin() {
    const [reservasLoading, setReservasLoading] = useState(true)
    const [currentDate, setCurrentDate] = useState(today)
    const [currentDateString, setCurrentDateString] = useState('')
    const [specialButtonText, setSpecialButtonText] = useState('mañana')

    const datePicker = useRef()

    useEffect(() => {
        setCurrentDateString(constructDate(today))
        loadReservas()
    }, [])

    useEffect(() => {
        setReservasLoading(true)
        setCurrentDateString(constructDate(currentDate))
        loadReservas()
    }, [currentDate])

    const loadReservas = () => {
        setTimeout(() => {
            setReservasLoading(false)
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

    return (
        <div>
            <header className="admin-header">
                <div>
                    <a
                        href="/"
                        className="header-logo"
                    >
                        <img
                            height={120}
                            width={120}
                            src="/images/logo_inline_black.svg"
                            alt="logo"
                        />
                    </a>
                </div>
                <div className="admin-nav">
                    <button
                        id="tomorrow-btn"
                        onClick={handleSpecialButton}
                    >
                        {specialButtonText}
                    </button>
                    <img
                        className="calendar-img"
                        src="/images/calendar.png"
                        alt="calendario"
                        onClick={handleCalendar}
                    />
                    <button className="pendientes">pendientes</button>
                </div>
                <div id="reservas-date-picker--container">
                    <input
                        type="date"
                        name="date"
                        id="res-date-picker"
                        ref={datePicker}
                        onChange={setDateFromCalendar}
                    />
                </div>
            </header>

            <h2
                // className="screen-title"
                id="reservations-title"
            >
                Reservaciones
            </h2>
            <h3 id="reservations-date">{currentDateString}</h3>

            <main className="main-admin">
                <img
                    id="reservations-loader"
                    className={reservasLoading ? 'visible' : 'invisible'}
                    src="/images/loaders/reservations.svg"
                    alt="loader"
                />

                <div
                    id="res-err-msg"
                    className="invisible centered"
                ></div>

                <div
                    className={`reservations-container ${
                        reservasLoading ? 'invisible' : 'visible'
                    }`}
                >
                    {dummyReservas.map((reserva) => (
                        <Reserva
                            reserva={reserva}
                            key={reserva.id}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Admin
