import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

interface content {
    title: string
    task: string
    statusDone: boolean
}

const Content = () => {

    const {t} = useTranslation()

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

    const fetchContent = useCallback(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/${id.todoId}`)
            .then(response => {return response.json()})
            .then((responseBody: any) => {setContent(responseBody)})
    }, [id.todoId])

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
            <div>Titel: {content.title} <input type='text' value={newTitle} placeholder={t('neuer Titel')} onChange={e => setNewTitle(e.target.value)} /></div>
            <div>Aufgabe: {content.task} <input type='text' value={newTask} placeholder={t('neue Aufgabe')} onChange={e => setNewTask(e.target.value)} /></div>
            <div>Status: {content.statusDone ? t('fertig') : t('nicht fertig')}</div>
            <button onClick={changeItem}>{t("Ändern!")}</button>
        </div>
    )
}

export default Content;