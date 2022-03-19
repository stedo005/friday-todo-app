import {useState} from "react";
import {Link} from "react-router-dom";


const Registration = () => {

    const [username, setUsername] =useState("")
    const [eMail, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
            method: "POST",
            body: JSON.stringify({
                "username": username,
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
            <input type={"text"} placeholder={"Name"} value={username} onChange={e => setUsername(e.target.value)}/><br/>
            <input type={"text"} placeholder={"e-Mail"} value={eMail} onChange={e => setEmail(e.target.value)}/><br/>
            <input type={"text"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <Link to={'../hallo'}><button onClick={login}>Register</button></Link>
        </div>

    )

}

export default Registration;

