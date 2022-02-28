import "./TodoItem.css"
import {Todos} from "./model"

const TodoItem = (props: Todos) => {

    const deleteItem = () => {
        fetch( `http://localhost:8080/todo-app/${props.id}`, {method: "DELETE"})
            .then(response => props.onItemChange())
    }

    const setStatusDone = () => {
        fetch(`http://localhost:8080/todo-app/${props.id}`,{method: "PUT"})
            .then(response => props.onItemChange())
    }

    function state(state: boolean) {
        if (!state) {
            return "noch nich fertsch"
        } else {
            return "fertsch"
        }
    }

    return(
        <div className="item-outer">
            <div>Aufgabe: {props.content}</div>
            <div>Status: {state(props.statusDone)}</div>
            <button onClick={deleteItem}>löschen</button>
            <button onClick={setStatusDone} hidden={props.statusDone}>erledigt</button>
        </div>
    )


}

export default TodoItem;