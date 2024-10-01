import { useState, useRef, useEffect } from 'react'

function Admin() {
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
                        id="cal-res-head"
                        src="/images/calendar.png"
                        alt="calendario"
                    />
                </div>
                <div id="res-date-picker--container">
                    <input
                        type="date"
                        name="date"
                        id="res-date-picker"
                    />
                </div>
            </header>

            <div id="head-spacers-res"></div>
            <h2
                className="aux-title"
                id="reservations-title"
            >
                Reservaciones
            </h2>
            <h3 id="reservations-date"></h3>

            <main className="main-admin">
                <img
                    id="reservations-loader"
                    className="invisible centered"
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
