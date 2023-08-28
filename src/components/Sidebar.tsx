import React from 'react'
import Tree from './Tree'
import './Sidebar.scss'

const Sidebar: React.FC = () => {
    return (
        <div className={'sidebar'}>
            <Tree></Tree>
        </div>
    )
}

export default Sidebar
