import "./TodoItem.css"
import {Todo} from "./model";

interface TodoItemProps {
    todo: Todo
    onItemChange: () => void
}

const TodoItem = (props: TodoItemProps) => {

    const deleteItem = () => {
        fetch( `${process.env.REACT_APP_BASE_URL}/todo-app/${props.todo.id}`, {method: "DELETE"})
            .then(() => props.onItemChange())
    }

    const setStatusDone = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/todo-app/${props.todo.id}`,{method: "PUT"})
            .then(() => props.onItemChange())
    }

    return(
        <div className={props.todo.statusDone ? 'item-outer-done' : 'item-outer-inProgress'}>
            <div onClick={deleteItem} className='btn-left'>löschen</div>
            <div className='box-content'>
                <div className='title'>{props.todo.content}</div>
                <div className={'status'}>{props.todo.statusDone ? "fertsch" : "nich fertsch"}</div>
            </div>
            <div onClick={setStatusDone} className='btn-right'>Status</div>
        </div>
    )

}

export default TodoItem;