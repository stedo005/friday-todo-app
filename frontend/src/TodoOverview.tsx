import TodoItem from "./TodoItem"
import {useEffect, useState} from "react";
import "./TodoOverview.css";
import plus from "./img/plus-icon.png";
import {Todo} from "./model";
import {Button} from "react-bootstrap";

const TodoOverview = () => {

    const [data, setData] = useState([] as Array<Todo>);
    const [contentInput, setContentInput] = useState('');
    const [search, setSearch] = useState('');
    const requestBody = {"content": contentInput};

    const fetchAll = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/listAllItem`)
            .then(response => {return response.json()})
            .then((responseBody: Array<Todo>) => {setData(responseBody)})
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
            .then(fetchAll)
            .then(() => setContentInput(""))
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
                <div onClick={addItem} className="sim-btn"><img src={plus} height={30} alt="plus"/></div>
                <div><input type="text" placeholder="Aufgabe" value={contentInput} onChange={value => setContentInput(value.target.value)}/></div>
            </div>
            <div className="input-field">
                <div>nach Aufgabe suchen: </div>
                <input id="search" type="text" placeholder="Aufgabe" value={search} onChange={value => setSearch(value.target.value)}/>
            </div>
            <div className="input-field">
                <Button onClick={listAllDone} variant="info">zeige alle mit Status fertsch</Button>
                <Button onClick={deleteAllDone} variant='danger'>lösche alle mit Status fertsch</Button>
            </div>
            <div className="input-field">
                <Button onClick={fetchAll} variant='info'>zeige alle</Button>
            </div>
            <div className="input-field">
                {
                    data.length > 0
                    ? data
                        .filter(e => e.content.toLowerCase().includes(search.toLowerCase()))
                        .map(e => <TodoItem key={e.id} todo={e} onItemChange={fetchAll}/>)
                    : <div>Alles erledigt.</div>
                }
            </div>
        </div>
    )
}

export default TodoOverview;