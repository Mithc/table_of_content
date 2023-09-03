import React, { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Tree from './Tree'
import { Theme } from '../../context/ThemeContext'

jest.mock('../../context/ThemeContext', () => ({
    ThemeContext: {
        Consumer: function MockConsumer({
            children,
        }: {
            children: (value: string) => ReactNode
        }) {
            return children('light')
        },
    },
}))

global.fetch = jest.fn()

describe('Tree Component', () => {
    const mockProps = {
        isLoading: false,
        treeData: {
            node0: {
                id: 'node0',
                title: 'Node 0',
                parentId: '',
                level: 0,
                pages: [],
                url: '',
            },
        },
        topLevelIds: ['node0'],
        isError: false,
        selectedNodeKey: null,
        setSelectedNodeKey: jest.fn(),
        retryLoadData: jest.fn(),
        theme: 'dark' as Theme,
    }

    it('renders loading state', () => {
        const loadingProps = { ...mockProps, isLoading: true }
        render(<Tree {...loadingProps} />)

        expect(screen.getByTestId('placeholder')).toBeInTheDocument()
    })

    it('renders tree nodes when not loading', () => {
        const { treeData } = mockProps
        render(<Tree {...mockProps} />)

        // Verify that the nodes are rendered
        expect(screen.getByText(treeData.node0.title)).toBeInTheDocument()

        // You can add more assertions as needed for your specific tree structure
    })
})
