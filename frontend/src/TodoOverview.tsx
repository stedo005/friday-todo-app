import TodoItem from "./TodoItem"
import {useEffect, useState} from "react";
import "./TodoOverview.css";
import {Todo} from "./model";
import {Col, Container, Form, Row} from "react-bootstrap";

const TodoOverview = () => {

    const [data, setData] = useState([] as Array<Todo>);
    const [titleInput, setTitleInput] = useState(localStorage.getItem('title') ?? '');
    const [taskInput, setTaskInput] = useState('');
    const [search, setSearch] = useState(localStorage.getItem('searchField') ?? '');
    const [errMsg, setErrMsg] = useState('');
    const [done, setDone] = useState(false)

    const requestBody = {
        "title": titleInput,
        "task": taskInput
    };

    useEffect(() => {
        localStorage.setItem('searchField', search)
        localStorage.setItem('title', titleInput)
    },[search, titleInput])

    useEffect(() => {
        done ? listAllDone() : fetchAll()
    }, [done])

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
        setDone(false)
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
            .catch((err: Error) => {setErrMsg(err.message)})
        setTitleInput("");
        setTaskInput("");
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
                <img onClick={addItem} className='btn-done' src={require('./icons/plus-circle.svg').default} alt={'check'}/>
                <div className='px-2'>
                    <input type="text" placeholder="Titel" value={titleInput} onChange={value => setTitleInput(value.target.value)} />
                </div>
                <div className='px-2'>
                    <input type='text' placeholder='Aufgabe' value={taskInput} onChange={value => setTaskInput(value.target.value)} onKeyUp={e => e.key == 'Enter' ? addItem() : ''} />
                </div>
                <div data-testid='errMsg'>{errMsg}</div>
            </div>
            <Container>
                <Row>
                    <Col lg={12} className='center p-3'><img onClick={deleteAllDone} className='btn-delete' src={require('./icons/x-circle.svg').default} alt={'check'}/><div className='mx-2'>Lösche alle erledigten Aufgaben!</div></Col>
                    <Col><div className='center'><Form.Check type='switch' label='Zeige alle erledigten Aufaben!' checked={done} onChange={() => done ? setDone(false) : setDone(true)} /></div></Col>
                </Row>
            </Container>
            <div className="input-field">
                <input id="search" type="text" placeholder="Suche" value={search} onChange={value => setSearch(value.target.value)}/>
            </div>
            <div className="input-field">
                {
                    data.length > 0
                    ? data
                        .filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
                        .map(e => <TodoItem key={e.id} todo={e} onItemChange={fetchAll}/>)
                    : <div>Es gibt nichts anzuzeigen.</div>
                }
            </div>
        </div>
    )
}

export default TodoOverview;