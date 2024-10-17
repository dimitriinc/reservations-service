import { useState } from 'react'
import Reservas from './Reservas'
import Carta from './Carta'

function Admin() {
    const [activeMode, setActiveMode] = useState('reservas')

    return (
        <>
            <header className="admin-header">
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
            </header>

            <nav>
                <h2
                    onClick={() => setActiveMode('reservas')}
                    className={`reservations-title ${
                        activeMode === 'reservas' && 'active'
                    }`}
                >
                    Reservaciones
                </h2>
                <h2
                    onClick={() => setActiveMode('carta')}
                    className={`reservations-title ${
                        activeMode === 'carta' && 'active'
                    }`}
                >
                    Carta
                </h2>
            </nav>

            {activeMode === 'reservas' ? <Reservas /> : <Carta />}

            <footer>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    strokeWidth="1.5"
                    stroke="#fff"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                    />
                </svg>
            </footer>
        </>
    )
}

export default Admin
