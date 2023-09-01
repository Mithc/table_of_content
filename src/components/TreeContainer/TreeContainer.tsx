import React, { useContext, useEffect, useState } from 'react'
import { PageList, PageListResponse } from '../../interfaces/Page'
import Tree from '../Tree/Tree'
import './TreeContainer.scss'
import { ThemeContext } from '../../context/ThemeContext'

const TreeContainer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(true)
    const [treeData, setTreeData] = useState<PageList>({})
    const [topLevelIds, setTopLevelIds] = useState<string[]>([])
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null)

    const theme = useContext(ThemeContext)
    useEffect((): void => {
        fetchData()
    }, [])

    const fetchData = async (): Promise<void> => {
        setIsError(false)
        const entitiesUrl = 'http://localhost:4200/entities'
        const topLevelIdsUrl = 'http://localhost:4200/topLevelIds'
        try {
            const [entitiesResponse, topLevelIdsResponse] = await Promise.all([
                fetch(entitiesUrl),
                fetch(topLevelIdsUrl),
            ])

            if (!entitiesResponse.ok || !topLevelIdsResponse.ok) {
                setIsError(true)
                throw new Error('Failed to fetch data')
            }

            const [pageListResponse, listOfIds]: [PageListResponse, string[]] =
                await Promise.all([
                    entitiesResponse.json(),
                    topLevelIdsResponse.json(),
                ])
            setTimeout(() => {
                setIsLoading(false)
                setTreeData(pageListResponse.pages)
                setTopLevelIds(listOfIds)
            }, 2000)
        } catch (error: unknown) {
            setIsError(true)
            console.error('Error fetching data:', error)
        }
    }

    const retryLoadData = () => {
        fetchData()
    }
    return (
        <div className={`tree-container ${theme}`}>
            {isError ? (
                <div className="error">
                    Error during loading
                    <button onClick={retryLoadData}>Try Again</button>
                </div>
            ) : (
                <Tree
                    isLoading={isLoading}
                    treeData={treeData}
                    topLevelIds={topLevelIds}
                    selectedNodeKey={selectedNodeKey}
                    setSelectedNodeKey={setSelectedNodeKey}
                    theme={theme}
                />
            )}
        </div>
    )
}

export default TreeContainer
