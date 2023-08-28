import React, { type JSX } from 'react'
import './App.scss'
import Sidebar from './components/Sidebar'

function App (): JSX.Element {
  return (
        <div className="app-container">
            <header className={'header'}>
                <h3 className={'header-text'}>PAGE HEADER</h3>
            </header>
            <div className="body-container">
                <Sidebar />
                <></>
            </div>
        </div>
  )
}

export default App
