import './App.css';
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import WebCum from "./WebCum/WebCum";
import Authorization from "./Authorization/Authorization";
import {useAuth} from "../useAuth";
import Registration from "./Registration/Registration";

function App() {

    const {isAuth} = useAuth();

    if (!isAuth()) {
        return (
            <Routes>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/register" element={<Registration/>}/>
                <Route path="/*" element={<Navigate replace to="/login"/>}/>
            </Routes>
        )
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<WebCum/>}/>
                <Route path="/login" element={<Authorization/>}/>
                <Route path="/register" element={<Registration/>}/>
            </Routes>
        </div>
    );
}

export default App;
