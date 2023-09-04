import { Page, PageList } from '../../interfaces/Page'
import { useState } from 'react'
import './TreeNode.scss'
import Icon from '../Icon/Icon'
import { Theme } from '../../context/ThemeContext'

interface TreeNodeProps {
    node: Page
    treeData: PageList
    activeNodeId: string | null
    setActiveNode: (id: string) => void
    lastActive?: boolean
    theme: Theme
    filteringValue: string
}

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    treeData,
    activeNodeId,
    setActiveNode,
    lastActive = false,
    theme,
    filteringValue,
}: TreeNodeProps) => {
    const [expanded, setExpanded] = useState(false)

    const isActiveNodeChild = (node: Page): boolean => {
        if (activeNodeId && node.pages) {
            return node.pages.some(
                (childId: string) =>
                    treeData[childId].id === activeNodeId ||
                    isActiveNodeChild(treeData[childId])
            )
        }
        return false
    }

    const getFilteringValue = (topLevelId: string): boolean => {
        return (
            treeData[topLevelId].pages?.some(getFilteringValue) ||
            treeData[topLevelId].title
                .toLowerCase()
                .includes(filteringValue.toLowerCase())
        )
    }

    const toggleExpand = () => {
        setExpanded((prevExpanded) => !prevExpanded)
    }
    return (
        <>
            <div
                onClick={() => {
                    setActiveNode(node.id)
                    toggleExpand()
                }}
                className={`parent-node 
                ${activeNodeId === node.id ? 'active' : ''} 
                ${lastActive ? 'lastActive' : ''} 
                level${node.level} 
                ${theme}`}
                data-testid={`level${node.level} ${
                    node.pages?.length ? 'has-children' : ''
                }`}
            >
                {node.pages?.length && (
                    <Icon
                        active={expanded}
                        fill={
                            theme !== 'dark' && activeNodeId !== node.id
                                ? '#000'
                                : '#fff'
                        }
                    />
                )}
                <span className="node-title">{node.title}</span>
            </div>
            {(expanded || isActiveNodeChild(node)) &&
                node.pages?.length &&
                node.pages
                    .filter(getFilteringValue)
                    .map((childrenNode: string) => {
                        return (
                            <TreeNode
                                node={treeData[childrenNode]}
                                treeData={treeData}
                                key={treeData[childrenNode].id}
                                activeNodeId={activeNodeId}
                                setActiveNode={setActiveNode}
                                lastActive={
                                    activeNodeId === node.id &&
                                    expanded &&
                                    node.level > 0
                                }
                                theme={theme}
                                filteringValue={filteringValue}
                            />
                        )
                    })}
        </>
    )
}

export default TreeNode
