import {useState} from "react";


const Registration = () => {

    const [eMail, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
            method: "POST",
            body: JSON.stringify({
                "email": eMail,
                "password": password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Etwas ist schief gelaufen!')
                }
                return response.text()
            })
    }

    return (

        <div>
            <input type={"text"} placeholder={"e-Mail"} value={eMail} onChange={e => setEmail(e.target.value)}/><br/>
            <input type={"text"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={login}>Login</button>
        </div>

    )

}

export default Registration;

