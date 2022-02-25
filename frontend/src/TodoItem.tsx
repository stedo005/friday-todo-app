import "./TodoItem.css"
import {Todos} from "./model"

export default function TodoItem(props: Todos) {

    function state(state: boolean) {
        if (!state) {
            return "nicht erledigt"
        } else {
            return "erledigt"
        }
    }

    return(
        <div className="item-outer">
            <div>{props.id}</div>
            <div>{props.content}</div>
            <div>{state(props.statusDone)}</div>
        </div>
    )

}