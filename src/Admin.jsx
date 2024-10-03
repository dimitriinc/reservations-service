import { useState, useRef, useEffect } from 'react'

function Admin() {
    const [reservasLoading, setReservasLoading] = useState(true)
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        setCurrentDate(constructDate(new Date()))
    }, [])

    const constructDate = (date) =>
        `${String(date.getDate()).padStart(2, 0)}/${String(
            date.getMonth() + 1
        ).padStart(2, 0)}/${date.getFullYear()}`

    return (
        <div>
            <header className="admin-header">
                <div className="admin-nav">
                    <a
                        href="/"
                        className="header-logo"
                    >
                        <img
                            height={90}
                            width={90}
                            src="/images/logo_inline_black.svg"
                            alt="logo"
                        />
                    </a>
                    <button id="tomorrow-btn">mañana</button>
                    <img
                        className="calendar-img"
                        src="/images/calendar.png"
                        alt="calendario"
                    />
                </div>
                <div id="reservas-date-picker--container">
                    <input
                        type="date"
                        name="date"
                        id="res-date-picker"
                    />
                </div>
            </header>

            <div id="head-spacers-res"></div>
            <h2
                // className="screen-title"
                id="reservations-title"
            >
                Reservaciones
            </h2>
            <h3 id="reservations-date">{currentDate}</h3>

            <main className="main-admin">
                <img
                    id="reservations-loader"
                    className={reservasLoading ? 'visible' : 'innvisible'}
                    src="/images/loaders/reservations.svg"
                    alt="loader"
                />

                <div
                    id="res-err-msg"
                    className="invisible centered"
                ></div>

                <div className="reservations-container invisible"></div>
            </main>
        </div>
    )
}

export default Admin
