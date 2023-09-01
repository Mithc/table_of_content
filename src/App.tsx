import { useState } from 'react'
import './App.scss'
import Sidebar from './components/Sidebar/Sidebar'
import { Theme, ThemeContext } from './context/ThemeContext'

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>(
        (localStorage.getItem('theme') || 'light') as Theme
    )
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        localStorage.setItem('theme', theme) // todo remove after debugging
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
                            <span
                                className="slider round"
                                data-testid="theme-switch-checkbox"
                            ></span>
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
