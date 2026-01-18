import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import List from './pages/list';
import Create from './pages/create';
import Home from './pages/home';
import SnackbarError from "./components/snackbar-error.tsx";

const App: React.FC = () => {
    return (
        <div className="App">
            <SnackbarError/>
            <Routes>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/list" element={<List/>}/>
                <Route path="/create" element={<Create/>}/>
            </Routes>
        </div>
    );
};

export default App;