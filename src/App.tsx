import React from 'react';
import './App.scss';
import Sidebar from "./components/Sidebar";

function App() {
    return <div className="app-container">
        <header className={'header'}>
            <h3 className={'header-text'}>PAGE HEADER</h3>
        </header>
        <Sidebar/>
    </div>
}

export default App;
