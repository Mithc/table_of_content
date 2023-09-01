import React, { useContext } from 'react'
import Placeholder from '../Placeholder/Placeholder'
import './Tree.scss'
import { PageList } from '../../interfaces/Page'
import TreeNode from '../TreeNode/TreeNode'
import { ThemeContext } from '../../context/ThemeContext'

interface TreeProps {
    isLoading: boolean
    treeData: PageList
    topLevelIds: string[]
    isError: boolean
    selectedNodeKey: string | null
    setSelectedNodeKey: React.Dispatch<React.SetStateAction<string | null>>
    retryLoadData: () => void
}

const Tree: React.FC<TreeProps> = ({
    isLoading,
    treeData,
    isError,
    topLevelIds,
    selectedNodeKey,
    setSelectedNodeKey,
    retryLoadData,
}) => {
    const theme = useContext(ThemeContext)
    const renderTree: React.FC = () => (
        <>
            {topLevelIds.map((topLevelId) => {
                return (
                    <TreeNode
                        key={treeData[topLevelId].id}
                        treeData={treeData}
                        node={treeData[topLevelId]}
                        activeNodeId={selectedNodeKey}
                        setActiveNode={setSelectedNodeKey}
                    />
                )
            })}
        </>
    )
    return (
        <div className={`tree-container ${theme}`}>
            {isError && (
                <div className="error">
                    Error during loading
                    <button onClick={retryLoadData}>Try Again</button>
                </div>
            )}
            {isLoading ? <Placeholder /> : <>{renderTree({})}</>}
        </div>
    )
}

export default Tree
