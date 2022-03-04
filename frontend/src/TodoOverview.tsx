import TodoItem from "./TodoItem"
import {useEffect, useState} from "react";
import "./TodoOverview.css";
import plus from "./img/plus-icon.png";
import {Todo} from "./model";
import {Button, Form} from "react-bootstrap";

const TodoOverview = () => {

    const [data, setData] = useState([] as Array<Todo>);
    const [contentInput, setContentInput] = useState(localStorage.getItem('title') ?? '');
    const [search, setSearch] = useState(localStorage.getItem('searchField') ?? '');
    const [errMsg, setErrMsg] = useState('');

    const requestBody = {"content": contentInput};

    useEffect(() => {
        localStorage.setItem('searchField', search)
        localStorage.setItem('title', contentInput)
    },[search, contentInput])

    const fetchAll = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/listAllItem`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Etwas ist schief gelaufen!')
                }
                return response.json()
            })
            .then((responseBody: Array<Todo>) => {setData(responseBody)})
            .catch((err: Error) => {setErrMsg(err.message)})

    }

    // Erstellt neues TodoItem
    const addItem = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if(!response.ok){
                    throw new Error('Etwas ist schief gelaufen beim Item erstellen!')
                }
            })
            .then(fetchAll)
            .then(() => setContentInput(""))
            .catch((err: Error) => {setErrMsg(err.message)})
    }

    const listAllDone = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/listAllDoneItem`)
            .then(response => {return response.json()})
            .then((responseBody: Array<Todo>) => {setData((responseBody))})
    }

    const deleteAllDone = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/deleteAllDone`, {
            method: "DELETE"
        })
            .then(fetchAll)
    }

    useEffect(() => {fetchAll()}, [])

    return(
        <div>
            <div className="input-field">
                <div data-testid='addBtn' onClick={addItem} className="sim-btn"><img src={plus} height={30} alt="plus"/></div>
                <div><input type="text" placeholder="Aufgabe" value={contentInput} onChange={value => setContentInput(value.target.value)}/></div>
                <div data-testid='errMsg'>{errMsg}</div>
            </div>
            <div className="input-field">
                <div>nach Aufgabe suchen: </div>
                <input id="search" type="text" placeholder="Aufgabe" value={search} onChange={value => setSearch(value.target.value)}/>
            </div>
            <div className="input-field">
                <Form.Check type='switch' label='zeige nur erledigte' onChange={(event) => {if(event.target.checked){listAllDone()}else {fetchAll()}}} />
                <Button onClick={deleteAllDone} variant='danger'>lösche alle mit Status fertsch</Button>
            </div>
            <div className="input-field">
                {
                    data.length > 0
                    ? data
                        .filter(e => e.content.toLowerCase().includes(search.toLowerCase()))
                        .map(e => <TodoItem key={e.id} todo={e} onItemChange={fetchAll}/>)
                    : <div>Es gibt nichts anzuzeigen.</div>
                }
            </div>
        </div>
    )
}

export default TodoOverview;