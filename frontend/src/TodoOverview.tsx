import TodoItem from "./TodoItem"
import {Todos} from "./model";
import {useEffect, useState} from "react";

const TodoOverview = () => {

    const [contentInput, setContentInput] = useState('');
    const [search, setSearch] = useState('');
    const [data, setData] = useState([] as Array<Todos>);
    const requestBody = {"content":contentInput};

    const fetchAll = () => {
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
            .then(fetchAll)
            .then(() => setContentInput(""))
    }

    useEffect(() => {fetchAll()}, [])

    return(
        <div>
            <div>
                <input type="text" placeholder="Aufgabe" value={contentInput} onChange={value => setContentInput(value.target.value)}/>
                <button onClick={addItem}>Neue Aufgabe estellen</button>
            </div>
            <div>
                <label htmlFor="search">nach Aufgabe suchen:</label>
                <input id="search" type="text" placeholder="Aufgabe" value={search} onChange={value => setSearch(value.target.value)}/>
            </div>
            <div>
                {
                    data.length > 0
                    ? data
                        .filter(e => e.content.toLowerCase().includes(search.toLowerCase()))
                        .map((e) => <TodoItem key={e.id} content={e.content} id={e.id} statusDone={e.statusDone} onItemChange={fetchAll}/>)
                    : <div>Alles erledigt.</div>
                }
            </div>
        </div>
    )
}

export default TodoOverview;