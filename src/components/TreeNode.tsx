import { Page, PageList } from '../interfaces/Page'
import React, { useState } from 'react'
import './TreeNode.scss'
import Icon from './Icon'

interface TreeNodeProps {
    node: Page
    treeData: PageList
}

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    treeData,
}: TreeNodeProps) => {
    const [active, setActive] = useState<boolean>(false)
    return (
        <>
            <div onClick={() => setActive(!active)} className="parent-node">
                {node.pages?.length && <Icon active={active} />}
                <span className="node-title">{node.title}</span>
            </div>
            <div className="child-node">
                {node.pages?.length &&
                    node.pages.map((childrenNode) => {
                        return (
                            <TreeNode
                                node={treeData[childrenNode]}
                                treeData={treeData}
                                key={treeData[childrenNode].id}
                            ></TreeNode>
                        )
                    })}
            </div>
        </>
    )
}

export default TreeNode
