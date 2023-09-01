import React, { useContext, useEffect, useState } from 'react'
import Placeholder from '../Placeholder/Placeholder'
import './Tree.scss'
import { PageList, PageListResponse } from '../../interfaces/Page'
import TreeNode from '../TreeNode/TreeNode'
import { ThemeContext } from '../../context/ThemeContext'

const Tree: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [treeData, setTreeData] = useState<PageList>({})
    const [topLevelIds, setTopLevelIds] = useState<string[]>([])
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
    const theme = useContext(ThemeContext)

    useEffect((): void => {
        fetchData()
    }, [])

    const fetchData = async (): Promise<void> => {
        const entitiesUrl = 'http://localhost:4200/entities'
        const topLevelIdsUrl = 'http://localhost:4200/topLevelIds'
        try {
            const [entitiesResponse, topLevelIdsResponse]: [
                Response,
                Response
            ] = await Promise.all([fetch(entitiesUrl), fetch(topLevelIdsUrl)])

            if (!entitiesResponse.ok || !topLevelIdsResponse.ok) {
                throw new Error('Failed to fetch data')
            }

            const [pageListResponse, listOfIds]: [PageListResponse, string[]] =
                await Promise.all([
                    entitiesResponse.json(),
                    topLevelIdsResponse.json(),
                ])

            setIsLoading(false)
            setTreeData(pageListResponse.pages)
            setTopLevelIds(listOfIds)
        } catch (error: unknown) {
            console.error('Error fetching data:', error)
        }
    }

    const renderTree: React.FC = () => (
        <>
            {topLevelIds.map((topLevelId) => {
                return (
                    <TreeNode
                        key={treeData[topLevelId].id}
                        treeData={treeData}
                        node={treeData[topLevelId]}
                        activeNodeId={activeNodeId}
                        setActiveNode={setActiveNodeId}
                    />
                )
            })}
        </>
    )
    return (
        <div className={`tree-container ${theme}`}>
            {isLoading ? <Placeholder /> : <>{renderTree({})}</>}
        </div>
    )
}

export default Tree
