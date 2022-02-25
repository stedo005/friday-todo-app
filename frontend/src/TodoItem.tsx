import "./TodoItem.css"
import {Todos} from "./model"
import {useEffect, useState} from "react";

export default function TodoItem(props: Todos) {

    let data =[] as Array<Todos>;

    const fetchAll = () => {
        fetch(`http://localhost:8080/todo-app/listAllItem`)
            .then(response => {return response.json()})
            .then((responseBody) => {data = responseBody})
    }

    const deleteItem = () => {
        fetch( `http://localhost:8080/todo-app/${props.id}`, {
            method: "DELETE"
        })
            .then(() => console.log("läuft"))
            .then(fetchAll)
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