import "./TodoItem.css"
import {Todos} from "./model"
import TodoOverview from "./TodoOverview";
import {useEffect, useState} from "react";

const TodoItem = (props: Todos) => {

    const deleteItem = () => {
        fetch( `http://localhost:8080/todo-app/${props.id}`, {
            method: "DELETE"
        })
            .then(() => console.log("gelöscht"))
    }

    return(
        <div className="item-outer">
            <div>{props.id}</div>
            <div>Aufgabe: {props.content}</div>
            <div>Status: {state(props.statusDone)}</div>
            <button onClick={deleteItem}>löschen</button>
        </div>
    )

    function state(state: boolean) {
        if (!state) {
            return "nicht erledigt"
        } else {
            return "erledigt"
        }
    }

}

export default TodoItem;