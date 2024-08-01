import ReactDOM from 'react-dom/client'
import './scss/style.scss'
import Header from './Header.jsx'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import { useState } from 'react'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const App = () => {
    const [activeLink, setActiveLink] = useState(0)
    const activateLink = (index) => {
        setActiveLink(index)
        // TODO: go to the page on the index
    }

    return (
        <>
            <Header
                activeLink={activeLink}
                activateLink={activateLink}
            />
            <Main activateLink={activateLink} />
            <Footer />
        </>
    )
}

root.render(<App />)
