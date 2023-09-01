import Placeholder from '../Placeholder/Placeholder'
import './Tree.scss'
import { PageList } from '../../interfaces/Page'
import TreeNode from '../TreeNode/TreeNode'
import { Theme } from '../../context/ThemeContext'

interface TreeProps {
    isLoading: boolean
    treeData: PageList
    topLevelIds: string[]
    selectedNodeKey: string | null
    setSelectedNodeKey: React.Dispatch<React.SetStateAction<string | null>>
    theme: Theme
}

const Tree: React.FC<TreeProps> = ({
    isLoading,
    treeData,
    topLevelIds,
    selectedNodeKey,
    setSelectedNodeKey,
    theme,
}) => {
    const renderTree = () => (
        <>
            {topLevelIds.map((topLevelId) => {
                return (
                    <TreeNode
                        key={treeData[topLevelId].id}
                        treeData={treeData}
                        node={treeData[topLevelId]}
                        activeNodeId={selectedNodeKey}
                        setActiveNode={setSelectedNodeKey}
                        theme={theme}
                    />
                )
            })}
        </>
    )
    return <>{isLoading ? <Placeholder /> : <>{renderTree()}</>}</>
}

export default Tree
