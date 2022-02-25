import TodoItem from "./TodoItem"
import {Todos} from "./model";
import {useEffect, useState} from "react";

export default function TodoOverview () {

    const [contentInput, setContentInput] = useState('');
    const [idToDelete, setIdToDelete] = useState('');
    const [idToSetDone, setIdToSetDone] = useState('')
    const [data, setData] = useState([] as Array<Todos>);
    const requestBody = {"content":contentInput}

    useEffect(() => {
        fetch(`http://localhost:8080/todo-app/listAllItem`)
            .then((response) => {return response.json()})
            .then((responseBody: Array<Todos>) => {setData(responseBody)})
    }, [])

    // Erstellt neues TodoItem
    const addItem = () => {
        fetch(`http://localhost:8080/todo-app`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const deleteItem = () => {
        fetch( `http://localhost:8080/todo-app/${idToDelete}`, {
            method: "DELETE"
        })
    }

    const setDone = () => {
        fetch(`http://localhost:8080/todo-app/${idToSetDone}`, {
            method: "PUT"
        })
    }

    return(
        <div>
            <div>
                <input type="text" placeholder="Aufgabe eingeben" value={contentInput} onChange={(ev) => setContentInput(ev.target.value)}/>
                <button onClick={addItem}>Neue Aufgabe estellen</button>
            </div>
            <div>
                <input type="text" placeholder="ID" value={idToDelete} onChange={value => setIdToDelete(value.target.value)}/>
                <button onClick={deleteItem}>Aufgabe löschen</button>
            </div>
            <div>
                <input type="text" placeholder="ID" value={idToSetDone} onChange={value => setIdToSetDone(value.target.value)}/>
                <button onClick={setDone}>Aufgabe erledigt</button>
            </div>
            <div>
                {data.map((e) => <TodoItem content={e.content} id={e.id} statusDone/>)}
            </div>
        </div>
    )
}