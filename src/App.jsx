import Header from './Header'
import Home from './mainScreens/Home'
import Horario from './mainScreens/Horario'
import Footer from './Footer'
import Signup from './mainScreens/Signup'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Carreras from './mainScreens/Carreras'
import Contacto from './mainScreens/Contacto'
import Carta from './mainScreens/Carta'
import Reservas from './mainScreens/Reservas'
import ScrollToTop from './custom/ScrollToTop'

function App() {
    const [activeLink, setActiveLink] = useState(0)
    const activateLink = (index) => {
        setActiveLink(index)
    }
    return (
        <Router>
            <ScrollToTop />
            <Header
                activeLink={activeLink}
                activateLink={activateLink}
            />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home activateLink={activateLink} />}
                    />
                    <Route
                        path="/carta"
                        element={<Carta activateLink={activateLink} />}
                    />
                    <Route
                        path="/reservas"
                        element={<Reservas activateLink={activateLink} />}
                    />
                    <Route
                        path="/horarios"
                        element={<Horario activateLink={activateLink} />}
                    />
                    <Route
                        path="/signup"
                        element={<Signup activateLink={activateLink} />}
                    />
                    <Route
                        path="/carreras"
                        element={<Carreras activateLink={activateLink} />}
                    />
                    <Route
                        path="/contacto"
                        element={<Contacto activateLink={activateLink} />}
                    />
                </Routes>
            </main>
            <Footer
                activeLink={activeLink}
                activateLink={activateLink}
            />
        </Router>
    )
}

export default App
