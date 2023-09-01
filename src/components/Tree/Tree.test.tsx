import React, { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Tree from './Tree'

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

    it('displays an error message and "Try Again" button when isError is true', () => {
        const errorProps = { ...mockProps, isError: true }
        render(<Tree {...errorProps} />)

        expect(screen.getByText('Error during loading')).toBeInTheDocument()
        expect(screen.getByText('Try Again')).toBeInTheDocument()

        // Simulate a click on the "Try Again" button
        fireEvent.click(screen.getByText('Try Again'))
        expect(errorProps.retryLoadData).toHaveBeenCalled()
    })
})
