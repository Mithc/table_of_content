import { Page, PageList } from '../interfaces/Page'
import React, { useContext, useState } from 'react'
import './TreeNode.scss'
import Icon from './Icon'
import { ThemeContext } from '../context/ThemeContext'

interface TreeNodeProps {
    node: Page
    treeData: PageList
    activeNodeId: string | null
    setActiveNode: (id: string) => void
    lastActive?: boolean
}

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    treeData,
    activeNodeId,
    setActiveNode,
    lastActive = false,
}: TreeNodeProps) => {
    const theme = useContext(ThemeContext)

    const [expanded, setExpanded] = useState(false)

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
            {expanded &&
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
                        ></TreeNode>
                    )
                })}
        </>
    )
}

export default TreeNode
