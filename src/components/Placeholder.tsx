import React, { useContext } from 'react'
import './Placeholder.scss'
import { ThemeContext } from '../context/ThemeContext'

const Placeholder: React.FC = () => {
    const theme = useContext(ThemeContext)
    return (
        <div className={`placeholder ${theme}`}>
            <div className="rectangle w100"></div>
            <div className="rectangle l1 w80"></div>
            <div className="rectangle l1 w80"></div>
            <div className="rectangle l2 w60"></div>
            <div className="rectangle l2 w80"></div>
            <div className="rectangle l1 w80"></div>
            <div className="rectangle w100"></div>
            <div className="rectangle w100"></div>
        </div>
    )
}

export default Placeholder
