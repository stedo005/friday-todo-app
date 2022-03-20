import TodoItem from "./TodoItem"
import {useCallback, useEffect, useState} from "react";
import "./TodoOverview.css";
import {Todo} from "./model";
import {Col, Container, Form, Row} from "react-bootstrap";
import {useTranslation} from "react-i18next";

const TodoOverview = () => {

    const {t} = useTranslation()

    const [data, setData] = useState([] as Array<Todo>);
    const [titleInput, setTitleInput] = useState(localStorage.getItem('title') ?? '');
    const [taskInput, setTaskInput] = useState('');
    const [search, setSearch] = useState(localStorage.getItem('searchField') ?? '');
    const [errMsg, setErrMsg] = useState('');
    const [doneSearch, setDoneSearch] = useState(false)
    const token = localStorage.getItem("token")

    const fetchAll = useCallback(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todo-app/listAllItem`,{
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(t('Etwas ist schief gelaufen!'))
                }
                return response.json()
            })
            .then((responseBody: Array<Todo>) => {setData(responseBody)})
            .then(() => setDoneSearch(false))
            .catch((err: Error) => {setErrMsg(err.message)})
    }, [t, token])

    const listAllDone = useCallback(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todo-app/listAllDoneItem`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {return response.json()})
            .then((responseBody: Array<Todo>) => {setData((responseBody))})
    },[token])

    useEffect(() => {
        localStorage.setItem('searchField', search)
        localStorage.setItem('title', titleInput)
    },[search, titleInput])

    useEffect(() => {
        doneSearch ? listAllDone() : fetchAll()
    }, [doneSearch, fetchAll, listAllDone])

    useEffect(() => {fetchAll()}, [fetchAll])

    // Erstellt neues TodoItem
    const addItem = () => {

        fetch(`${process.env.REACT_APP_BASE_URL}/api/todo-app`, {
            method: "POST",
            body: JSON.stringify({
                "title": titleInput,
                "task": taskInput
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                if(!response.ok){
                    throw new Error(t('Etwas ist schief gelaufen beim Todo erstellen!'))
                }
            })
            .then(fetchAll)
            .then(() => setTitleInput(''))
            .then(() => setTaskInput(''))
            .catch((err: Error) => {setErrMsg(err.message)})
    }

    const deleteAllDone = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/todo-app/deleteAllDone`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(fetchAll)
    }

    return(
        <div>
            <div className={'center mt-3 mb-3'}>
                <div hidden={token === ""}>
                    Du bist eingeloggt als: {localStorage.getItem("username")}
                </div>
                <div hidden={token !== ""}>Du musst dich einloggen oder registrieren!</div>
            </div>
            <div className="input-field">
                <img data-testid='addBtn' onClick={addItem} className='btn-done' src={require('./icons/plus-circle.svg').default} alt={'check'}/>
                <div className='px-2'>
                    <input type="text" placeholder={t("Titel")} value={titleInput} onChange={value => setTitleInput(value.target.value)} />
                </div>
                <div className='px-2'>
                    <input type='text' placeholder={t('Aufgabe')} value={taskInput} onChange={value => setTaskInput(value.target.value)} onKeyUp={e => {if (e.key === 'Enter') {addItem()}}} />
                </div>
                <div data-testid='errMsg'>{errMsg}</div>
            </div>
            <Container>
                <Row>
                    <Col lg={12} className='center p-3'><img onClick={deleteAllDone} className='btn-delete' src={require('./icons/x-circle.svg').default} alt={'check'}/><div className='mx-2'>{t('Lösche alle erledigten Aufgaben!')}</div></Col>
                    <Col><div className='center'><Form.Check type='switch' label={t('Zeige alle erledigten Aufaben!')} checked={doneSearch} onChange={() => doneSearch ? setDoneSearch(false) : setDoneSearch(true)} /></div></Col>
                </Row>
            </Container>
            <div className="input-field">
                <input id="search" type="text" placeholder={t("Suche")} value={search} onChange={value => setSearch(value.target.value)}/>
            </div>
            <div className="input-field">
                {
                    data.length > 0
                    ? data
                        .filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
                        .map(e => <TodoItem key={e.id} todo={e} onItemChange={fetchAll}/>)
                    : <div>{t("Es gibt nichts anzuzeigen.")}</div>
                }
            </div>
        </div>
    )
}

export default TodoOverview;