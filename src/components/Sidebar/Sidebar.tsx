import React, { useContext } from 'react'
import './Sidebar.scss'
import { ThemeContext } from '../../context/ThemeContext'
import TreeContainer from '../TreeContainer/TreeContainer'

const Sidebar: React.FC = () => {
    const theme = useContext(ThemeContext)

    return (
        <div className={`sidebar ${theme}`}>
            <TreeContainer />
        </div>
    )
}

export default Sidebar
