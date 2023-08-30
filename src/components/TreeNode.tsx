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
}

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    treeData,
    activeNodeId,
    setActiveNode,
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
                className={`parent-node ${
                    activeNodeId === node.id ? 'active' : ''
                } level${node.level} ${theme}`}
            >
                {node.pages?.length && (
                    <Icon
                        active={activeNodeId === node.id}
                        fill={theme === 'dark' ? '#fff' : '#000000'}
                    /> //todo
                )}
                <span className="node-title">{node.title}</span>
            </div>
            {expanded && (
                <div className="child-node">
                    {node.pages?.length &&
                        node.pages.map((childrenNode: string) => {
                            return (
                                <TreeNode
                                    node={treeData[childrenNode]}
                                    treeData={treeData}
                                    key={treeData[childrenNode].id}
                                    activeNodeId={activeNodeId}
                                    setActiveNode={setActiveNode}
                                ></TreeNode>
                            )
                        })}
                </div>
            )}
        </>
    )
}

export default TreeNode
