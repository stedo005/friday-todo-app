import "./TodoItem.css"
import {Todos} from "./model"
import {useEffect, useState} from "react";

export default function TodoItem(props: Todos) {

    const idItem = props.id

    const deleteItem = () => {
        fetch( `http://localhost:8080/todo-app/${idItem}`, {
            method: "DELETE"
        })
            .then(() => console.log("läuft"))
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