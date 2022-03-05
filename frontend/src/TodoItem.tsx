import "./TodoItem.css"
import {Todo} from "./model";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

interface TodoItemProps {
    todo: Todo
    onItemChange: () => void
}

const TodoItem = (props: TodoItemProps) => {

    const {t} = useTranslation();

    const requestBody = {
        "title": props.todo.title,
        "task": props.todo.task,
        "statusDone": props.todo.statusDone
    }

    const deleteItem = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/${props.todo.id}`, {method: "DELETE"})
            .then(() => props.onItemChange())
    }

    const setStatusDone = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/${props.todo.id}`, {method: "PUT"})
            .then(() => props.onItemChange())
    }

    return (
        <div className={props.todo.statusDone ? 'item-outer-done' : 'item-outer-inProgress'}>
            <div onClick={deleteItem} className='btn-left'><img className='btn-delete' src={require('./icons/x-circle.svg').default} alt={'check'}/></div>
            <Link className='noline' to={props.todo.id}>
                <div className='box-content'>
                    <div className='title'>{props.todo.title}</div>
                    <div className={'status'}>{props.todo.statusDone ? t('fertig') : t('nicht-fertig')}</div>
                </div>
            </Link>
            <div onClick={setStatusDone} className='btn-right'><img className='btn-done' src={require('./icons/check-circle.svg').default} alt={'check'}/></div>
        </div>
    )

}

export default TodoItem;