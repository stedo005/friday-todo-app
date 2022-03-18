import {useState} from "react";


const Login = () => {

    const [eMail, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")

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
            .then((responseBody: string) => {setToken(responseBody)})
            .then(() => localStorage.setItem("token", token))
    }

    return (

        <div>
            <input type={"text"} placeholder={"e-Mail"} value={eMail} onChange={e => setEmail(e.target.value)}/><br/>
            <input type={"text"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={login}>Login</button>
            <p>token: {token}</p>
        </div>

    )

}

export default Login;