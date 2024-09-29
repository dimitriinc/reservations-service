function Admin() {
    return (
        <div>
            <header className="reservations-header">
                <div className="flex-header-container">
                    <img
                        id="logo-res-head"
                        src="/images/logo_inline_black.svg"
                        alt="logo"
                    />
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
