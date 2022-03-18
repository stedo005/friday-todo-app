import {Link, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

interface Contents {
    id: string,
    title: string,
    task: string,
    statusDone: boolean
}

const Content = () => {

    const {t} = useTranslation()

    const token = localStorage.getItem("token")

    const [contents, setContents] = useState({} as Contents);
    const id = useParams();

    const [newTitle, setNewTitle] = useState('')
    const [newTask, setNewTask] = useState('')

    const fetchContent = useCallback(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/${id.todoId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {return response.json()})
            .then((responseBody: any) => {setContents(responseBody)})
    }, [id.todoId, token])

    const changeItem = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/${id.todoId}`, {
            method: "PUT",
            body: JSON.stringify({
                "id": `${contents.id}`,
                "title": newTitle,
                "task": newTask,
                "statusDone": `${contents.statusDone}`
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(() => fetchContent())
            .then(() => setNewTitle(''))
            .then(() => setNewTask(''))
    }

    useEffect(() => {fetchContent()}, [fetchContent])

    return(
        <div>
            <div>Titel: {contents.title} <input type='text' value={newTitle} placeholder={t('neuer Titel')} onChange={e => setNewTitle(e.target.value)} /></div>
            <div>Aufgabe: {contents.task} <input type='text' value={newTask} placeholder={t('neue Aufgabe')} onChange={e => setNewTask(e.target.value)} /></div>
            <div>Status: {contents.statusDone ? t('fertig') : t('nicht fertig')}</div>
            <Link to={'../todolist'}>
                <button onClick={changeItem}>{t("Ändern!")}</button>
            </Link>
        </div>
    )
}

export default Content;