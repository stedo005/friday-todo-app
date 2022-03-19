import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [eMail, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [errMsg, setErrMsg] = useState('')

    const getUser = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/${eMail}`,{
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {return response.text()})
            .then(responseBody => localStorage.setItem("username", responseBody))
    }

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
                    setErrMsg("falsches Passwort oder E-Mail")
                    throw new Error()
                }
                return response.text()
            })
            .then((responseBody: string) => {localStorage.setItem("token", responseBody)})
            .then(getUser)
            .then(() => navigate('../todolist'))
    }

    return (

        <div>
            <input type={"text"} placeholder={"e-Mail"} value={eMail} onChange={e => setEmail(e.target.value)}/><br/>
            <input type={"text"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={login}>Login</button>
            <div>{errMsg}</div>
        </div>

    )

}

export default Login;