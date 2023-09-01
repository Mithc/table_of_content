import React, { type JSX, useState } from 'react'
import './App.scss'
import Sidebar from './components/Sidebar/Sidebar'
import { Theme, ThemeContext } from './context/ThemeContext'

function App(): JSX.Element {
    const [theme, setTheme] = useState<Theme>(() => {
        console.log(localStorage.getItem('theme'))
        return (localStorage.getItem('theme') || 'light') as Theme
    })
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark') // todo
        localStorage.setItem('theme', theme)
    }
    return (
        <ThemeContext.Provider value={theme}>
            <div className={`app-container ${theme}`}>
                <header className="header">
                    <h4 className="header-text">Product name</h4>

                    {/*Could be moved to another component*/}
                    <div className="theme-switch">
                        <label className="switch">
                            <input
                                type="checkbox"
                                onChange={toggleTheme}
                                checked={theme === 'dark'}
                            />
                            <span className="slider round"></span>
                        </label>
                        <span className="label">Dark Mode</span>
                    </div>
                </header>
                <div className="body-container">
                    <Sidebar />
                    <></>
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

export default App
