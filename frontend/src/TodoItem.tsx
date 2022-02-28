import "./TodoItem.css"
import {Todo} from "./model";

interface TodoItemProps {
    todo: Todo
    onItemChange: () => void
}

const TodoItem = (props: TodoItemProps) => {

    const deleteItem = () => {
        fetch( `http://localhost:8080/todo-app/${props.todo.id}`, {method: "DELETE"})
            .then(() => props.onItemChange())
    }

    const setStatusDone = () => {
        fetch(`http://localhost:8080/todo-app/${props.todo.id}`,{method: "PUT"})
            .then(() => props.onItemChange())
    }

    return(
        <div className="item-outer">
            <div>Aufgabe: {props.todo.content}</div>
            <div>Status: {props.todo.statusDone ? "fertsch" : "nich fertsch"}</div>
            <button onClick={deleteItem}>löschen</button>
            <button onClick={setStatusDone}>toggle Status</button>
        </div>
    )

}

export default TodoItem;