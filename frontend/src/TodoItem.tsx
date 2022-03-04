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
            <div onClick={deleteItem} className='btn-left'>{t('btn-delete')}</div>
            <Link to={props.todo.id}>
                <div className='box-content'>
                    <div className='title'>{props.todo.content}</div>
                    <div className={'status'}>{props.todo.statusDone ? t('fertig') : t('nicht-fertig')}</div>
                </div>
            </Link>
            <div onClick={setStatusDone} className='btn-right'>{t('btn-state')}</div>
        </div>
    )

}

export default TodoItem;