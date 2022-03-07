import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const App = () => {

    return (
        <div>
            <div>
                <div><Link to={'todolist'}>Todo Liste</Link></div>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
