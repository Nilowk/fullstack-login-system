import React from 'react';
import { createRoot } from "react-dom/client";

import './index.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import reportWebVitals from './reportWebVitals';
import Account from "./pages/Account";

const root = createRoot(document.getElementById('root'))

root.render(

    <BrowserRouter basename={'/'}>
        <Routes>
            <Route path={"/login"} element={<Login />}/>
            <Route path={"/register"} element={<Register />} />
            <Route path={"/account"} element={<Account />} />
        </Routes>
    </BrowserRouter>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
