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

function App() {
    const [activeLink, setActiveLink] = useState(0)
    const activateLink = (index) => {
        setActiveLink(index)
    }
    return (
        <Router>
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
                        Component={Carta}
                    />
                    <Route
                        path="/reservas"
                        Component={Reservas}
                    />
                    <Route
                        path="/horarios"
                        Component={Horario}
                    />
                    <Route
                        path="/signup"
                        Component={Signup}
                    />
                    <Route
                        path="/carreras"
                        Component={Carreras}
                    />
                    <Route
                        path="/contacto"
                        Component={Contacto}
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
