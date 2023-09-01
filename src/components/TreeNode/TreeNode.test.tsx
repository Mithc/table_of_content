import React, { ReactNode } from 'react'
import { render, fireEvent } from '@testing-library/react'
import TreeNode from './TreeNode'

jest.mock('../context/ThemeContext', () => ({
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

const mockNode = {
    id: 'Getting_started',
    title: 'Getting started',
    url: 'getting-started.html',
    parentId: 'ij',
    level: 0,
    tabIndex: 0,
    doNotShowWarningLink: true,
    pages: ['Accessibility', 'Discover_IntelliJ_IDEA'],
}

const mockTreeData = {
    nodeId: mockNode,

    Accessibility: {
        id: 'Accessibility',
        title: 'Accessibility',
        url: 'accessibility.html',
        parentId: 'Getting_started',
        level: 1,
        tabIndex: 0,
        doNotShowWarningLink: true,
    },
    Discover_IntelliJ_IDEA: {
        id: 'Discover_IntelliJ_IDEA',
        title: 'IntelliJ IDEA overview',
        url: 'discover-intellij-idea.html',
        parentId: 'Getting_started',
        level: 1,
        tabIndex: 1,
        doNotShowWarningLink: true,
        pages: [
            'Guided_Tour_Around_the_User_Interface',
            'Pro_Tips',
            'Getting_Help',
        ],
    },
}

describe('TreeNode Component', () => {
    it('renders node title', () => {
        const { getByText } = render(
            <TreeNode
                node={mockNode}
                treeData={mockTreeData}
                activeNodeId={null}
                setActiveNode={() => {}}
            />
        )
        const nodeTitle = getByText(mockNode.title)
        expect(nodeTitle).toBeInTheDocument()
    })

    it('expands child nodes when clicked', () => {
        const setActiveNode = jest.fn()
        const { getByText, queryByText } = render(
            <TreeNode
                node={mockNode}
                treeData={mockTreeData}
                activeNodeId={null}
                setActiveNode={setActiveNode}
            />
        )

        expect(queryByText('Accessibility')).toBeNull()
        expect(queryByText('IntelliJ IDEA overview')).toBeNull()

        fireEvent.click(getByText(mockNode.title))

        expect(getByText('Accessibility')).toBeInTheDocument()
        expect(getByText('IntelliJ IDEA overview')).toBeInTheDocument()
    })

    it('calls setActiveNode and toggles expansion on click', () => {
        const setActiveNode = jest.fn()
        const { getByText } = render(
            <TreeNode
                node={mockNode}
                treeData={mockTreeData}
                activeNodeId={null}
                setActiveNode={setActiveNode}
            />
        )

        fireEvent.click(getByText(mockNode.title))

        expect(setActiveNode).toHaveBeenCalledWith('Getting_started')
    })
})
