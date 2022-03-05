import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

interface content {
    title: string
    task: string
    statusDone: boolean
}

const Content = () => {

    const [content, setContent] = useState({} as content);
    const id = useParams();

    const [newTitle, setNewTitle] = useState('')
    const [newTask, setNewTask] = useState('')

    const requestBody = {
        "id": id.todoId,
        "title": newTitle,
        "task": newTask,
        "statusDone": content.statusDone
    }

    const fetchContent = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/${id.todoId}`)
            .then(response => {return response.json()})
            .then((responseBody: any) => {setContent(responseBody)})
    }

    useEffect(() => {fetchContent()}, [])

    const changeItem = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app`, {
            method: "PUT",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(() => fetchContent())
            .then(() => setNewTitle(''))
            .then(() => setNewTask(''))
    }

    return(
        <div>
            <div>Titel: {content.title} <input type='text' value={newTitle} placeholder='neuer Titel' onChange={e => setNewTitle(e.target.value)} /></div>
            <div>Aufgabe: {content.task} <input type='text' value={newTask} placeholder='neue Aufgabe' onChange={e => setNewTask(e.target.value)} /></div>
            <div>Status: {content.statusDone ? 'fertig' : 'nicht fertig'}</div>
            <button onClick={changeItem}>Ändern!</button>
        </div>
    )
}

export default Content;