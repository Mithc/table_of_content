import React, { useState } from 'react'
import Placeholder from './Placeholder'
import './Tree.scss'

const Tree: React.FC = () => {
  const [isLoading] = useState<boolean>(true)

  const renderTree: () => React.ReactElement = () => <></>

  return (
        <div className={'tree-container'}>
            {isLoading ? <Placeholder /> : renderTree()}
        </div>
  )
}

export default Tree
