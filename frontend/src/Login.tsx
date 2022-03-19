import {useState} from "react";
import {Link} from "react-router-dom";


const Login = () => {

    const [eMail, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState(localStorage.getItem("token") as string)

    const login = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
                "username": eMail,
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
            .then((responseBody: string) => {localStorage.setItem("token", responseBody)})
    }

    return (

        <div>
            <input type={"text"} placeholder={"e-Mail"} value={eMail} onChange={e => setEmail(e.target.value)}/><br/>
            <input type={"text"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <Link to={'../todolist'}><button onClick={login}>Login</button></Link>
        </div>

    )

}

export default Login;