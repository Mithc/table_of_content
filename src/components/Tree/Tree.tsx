import Placeholder from '../Placeholder/Placeholder'
import './Tree.scss'
import { PageList } from '../../interfaces/Page'
import TreeNode from '../TreeNode/TreeNode'
import { Theme } from '../../context/ThemeContext'
import { useState } from 'react'

interface TreeProps {
    isLoading: boolean
    treeData: PageList
    topLevelIds: string[]
    selectedNodeKey: string | null
    setSelectedNodeKey: React.Dispatch<React.SetStateAction<string | null>>
    theme: Theme
    filtering?: boolean
}

const Tree: React.FC<TreeProps> = ({
    isLoading,
    treeData,
    topLevelIds,
    selectedNodeKey,
    setSelectedNodeKey,
    theme,
    filtering = false,
}) => {
    const [filteringValue, setFilteringValue] = useState('')

    const getFilteringValue = (topLevelId: string): boolean => {
        return (
            treeData[topLevelId].pages?.some(getFilteringValue) ||
            treeData[topLevelId].title
                .toLowerCase()
                .includes(filteringValue.toLowerCase())
        )
    }
    const renderTree = () => (
        <>
            {filtering && (
                <>
                    <label htmlFor="filter" className={`filter-label ${theme}`}>
                        Filter:
                        <input
                            type="text"
                            id="filter"
                            onChange={(event) =>
                                setFilteringValue(event.target.value)
                            }
                            placeholder="print something"
                        />
                    </label>
                </>
            )}
            {topLevelIds.filter(getFilteringValue).map((topLevelId) => {
                return (
                    <TreeNode
                        key={treeData[topLevelId].id}
                        treeData={treeData}
                        node={treeData[topLevelId]}
                        activeNodeId={selectedNodeKey}
                        setActiveNode={setSelectedNodeKey}
                        theme={theme}
                        filteringValue={filteringValue}
                    />
                )
            })}
        </>
    )
    return (
        <>{isLoading ? <Placeholder theme={theme} /> : <>{renderTree()}</>}</>
    )
}

export default Tree
