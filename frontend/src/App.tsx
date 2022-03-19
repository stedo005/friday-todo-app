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
                    <Link to={'todolist'}><button>Zeige alle todos</button></Link>
                    <Link to={'login'}><button>Login</button></Link>
                    <Link to={'register'}><button>Registrierung</button></Link>
                    <Link to={'byebye'}><button onClick={logout}>Logout</button></Link>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
