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
}

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    treeData,
    activeNodeId,
    setActiveNode,
    lastActive = false,
    theme,
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
                ${activeNodeId === node.id && 'active'} 
                ${lastActive && 'lastActive'} 
                level${node.level} 
                ${theme}`}
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
                node.pages.map((childrenNode: string) => {
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
                        />
                    )
                })}
        </>
    )
}

export default TreeNode
