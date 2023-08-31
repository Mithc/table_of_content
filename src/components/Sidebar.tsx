import React, { useContext } from 'react'
import Tree from './Tree'
import './Sidebar.scss'
import { ThemeContext } from '../context/ThemeContext'

const Sidebar: React.FC = () => {
    const theme = useContext(ThemeContext)

    return (
        <div className={`sidebar ${theme}`}>
            <Tree />
        </div>
    )
}

export default Sidebar
