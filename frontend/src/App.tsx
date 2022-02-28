import React from 'react';
import TodoOverview from "./TodoOverview";

function App() {

/*    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        fetch('http://localhost:8080/todo-app/listAllItem', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(text => setGreeting(text))
            .catch(err => setGreeting('Da ist etwas schief gelaufen'));
    }, []);*/

    return (
        <div>
 {/*           <div>
                //{greeting}
            </div>*/}
            <div>
                < TodoOverview />
            </div>
        </div>
    );
}

export default App;
