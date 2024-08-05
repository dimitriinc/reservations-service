import Header from './Header'
import Main from './mainScreens/Main'
import Horario from './mainScreens/Horario'
import Footer from './Footer'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
                        exact
                        path="/"
                        Component={Main}
                    />
                    <Route
                        path="/horarios"
                        Component={Horario}
                    />
                </Routes>
            </main>
            <Footer activeLink={activeLink} />
        </Router>
    )
}

export default App
