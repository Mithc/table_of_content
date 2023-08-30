import React, { useEffect, useState } from 'react'
import Placeholder from './Placeholder'
import './Tree.scss'
import { PageList, PageListResponse } from '../interfaces/Page'
import TreeNode from './TreeNode'

const Tree: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [treeData, setTreeData] = useState<PageList>({})
    const [topLevelIds, setTopLevelIds] = useState<string[]>([])
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
                    />
                )
            })}
        </>
    )
    return (
        <div className="tree-container">
            {isLoading ? <Placeholder /> : <>{renderTree({})}</>}
        </div>
    )
}

export default Tree
