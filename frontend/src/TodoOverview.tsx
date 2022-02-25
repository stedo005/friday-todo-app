import TodoItem from "./TodoItem"
import {Todos} from "./model";
import {useEffect, useState} from "react";

export default function TodoOverview () {

    const [contentInput, setContentInput] = useState('');
    const [idToDelete, setIdToDelete] = useState('');
    const [idToSetDone, setIdToSetDone] = useState('')
    const [search, setSearch] = useState('')
    const [data, setData] = useState([] as Array<Todos>);
    const requestBody = {"content":contentInput}

    const fetching = () => {
        fetch(`http://localhost:8080/todo-app/listAllItem`)
            .then(response => {return response.json()})
            .then((responseBody: Array<Todos>) => {setData(responseBody)})
    }

    // Erstellt neues TodoItem
    const addItem = () => {
        fetch(`http://localhost:8080/todo-app`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(fetching)
            .then(() => setContentInput(""))
    }

    const deleteItem = () => {
        fetch( `http://localhost:8080/todo-app/${idToDelete}`, {
            method: "DELETE"
        })
            .then(fetching)
            .then(() => setIdToDelete(""))

    }

    const setDone = () => {
        fetch(`http://localhost:8080/todo-app/${idToSetDone}`, {
            method: "PUT"
        })
            .then(fetching)
            .then(() => setIdToSetDone(""))
    }

    useEffect(() => {
        fetch(`http://localhost:8080/todo-app/listAllItem`)
            .then((response) => {return response.json()})
            .then((responseBody: Array<Todos>) => {setData(responseBody)})
    }, [])

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
                <button onClick={setDone} >Aufgabe erledigt</button>
            </div>
            <div>
                <input type="text" placeholder="Suche" value={search} onChange={value => setSearch(value.target.value)}/>
            </div>
            <div>
                {
                    data.length > 0
                    ? data
                        .filter(e => e.content.toLowerCase().includes(search.toLowerCase()))
                        .map((e) => <TodoItem key={e.id} content={e.content} id={e.id} statusDone={e.statusDone}/>)
                    : <div>Noch nicht fertig</div>
                }
            </div>
        </div>
    )
}