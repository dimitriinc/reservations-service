import ReactDOM from 'react-dom/client'
import './scss/style.scss'
import Header from './Header.jsx'
import Main from './Main.jsx'
import Footer from './Footer.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))



root.render(
    <>
        <Header />
        <Main />
        <Footer />
    </>
)