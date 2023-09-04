import React from 'react'
import './Placeholder.scss'
import { Theme } from '../../context/ThemeContext'

const Placeholder: React.FC<{ theme: Theme }> = ({ theme }) => {
    return (
        <div className={`placeholder ${theme}`} data-testid="placeholder">
            <div className="rectangle w100" />
            <div className="rectangle l1 w80" />
            <div className="rectangle l1 w80" />
            <div className="rectangle l2 w60" />
            <div className="rectangle l2 w80" />
            <div className="rectangle l1 w80" />
            <div className="rectangle w100" />
            <div className="rectangle w100" />
        </div>
    )
}

export default Placeholder
