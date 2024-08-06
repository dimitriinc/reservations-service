import { useState } from "react"

function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })
    const [errorMsg, setErrorMsg] = useState('')

    
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            Signup!!!
        </div>
    )
}

export default Signup
