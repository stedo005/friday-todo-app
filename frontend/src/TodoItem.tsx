import {Todos} from "./model"

export default function TodoItem(props: Todos) {

    return(
        <div>
            <div>{props.id}</div>
            <div>{props.content}</div>
            <div>{props.statusDone}</div>
        </div>
    )

}