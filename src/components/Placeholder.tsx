import React from 'react'
import './Placeholder.scss'

const Placeholder: React.FC = () => {
  return (
        <div className="placeholder">
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
