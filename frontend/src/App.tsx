import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const App = () => {

    const logout = () => {
        localStorage.setItem("token", "")
    }

    return (
        <div>
            <div>
                <div>
                    <button onClick={logout}>logout</button>
                </div>
                <div><Link to={'todolist'}>Todo Liste</Link></div>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
