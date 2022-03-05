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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/${id.todoId}`)
            .then(response => {return response.json()})
            .then((responseBody: any) => {setContent(responseBody)})
    }, [])

    return(
        <div>
            <div>Titel: {content.title}</div>
            <div>Aufgabe: {content.task}</div>
            <div>Status: {content.statusDone ? 'fertig' : 'nicht fertig'}</div>
        </div>
    )
}

export default Content;