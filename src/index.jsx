import ReactDOM from 'react-dom/client'
import './scss/style.scss'
import App from './App.jsx'
import Admin from './Admin.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <App />
)
