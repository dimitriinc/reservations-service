import { useState } from 'react'
import Reservas from './Reservas'
import Carta from './Carta'

function Admin() {
    const [activeMode, setActiveMode] = useState(
        sessionStorage.getItem('adminMode') || 'reservas'
    )
    function handleModeChange(mode) {
        setActiveMode(mode)
        sessionStorage.setItem('adminMode', mode)
    }

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
            <main
                className="admin-main"
                style={{ minHeight: '100vh' }}
            >
                <nav className="admin-nav">
                    <h2
                        onClick={() => handleModeChange('reservas')}
                        className={`reservations-title ${
                            activeMode === 'reservas' && 'active'
                        }`}
                    >
                        Reservaciones
                    </h2>
                    <h2
                        onClick={() => handleModeChange('carta')}
                        className={`reservations-title ${
                            activeMode === 'carta' && 'active'
                        }`}
                    >
                        Carta
                    </h2>
                </nav>

                {activeMode === 'reservas' ? <Reservas /> : <Carta />}
            </main>
            <footer className="admin-footer">
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
