import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import './i18n'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Content from './Content';
import TodoOverview from "./TodoOverview";
import Login from "./Login";
import Registration from "./Registration";
import ByeBye from "./ByeBye";
import Hallo from "./Hallo";


ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="Loading...">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="todolist" element={<TodoOverview />}/>
                        <Route path="todolist/:todoId" element={<Content />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/byebye" element={<ByeBye />} />
                        <Route path="/hallo" element={<Hallo />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
