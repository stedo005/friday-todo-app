import {useState} from "react";
import {useNavigate} from "react-router-dom";


const Registration = () => {

    const [username, setUsername] =useState("")
    const [eMail, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate()

    const createUser = () => {
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
            .then(responseBody => {
                if(responseBody === "Diese eMail-Adresse existiert schon") {
                    setErrMsg("Diese eMail-Adresse existiert schon!")
                    throw new Error()
                }
                navigate("../hallo")
            })
    }

    return (

        <div>
            <input type={"text"} placeholder={"Name"} value={username} onChange={e => setUsername(e.target.value)}/><br/>
            <input type={"text"} placeholder={"e-Mail"} value={eMail} onChange={e => setEmail(e.target.value)}/><br/>
            <input type={"text"} placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)}/><br/>
            <button onClick={createUser}>Register</button>
            <div>{errMsg}</div>
        </div>

    )

}

export default Registration;

