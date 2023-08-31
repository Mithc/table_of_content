import React, { ReactNode } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tree from './Tree'

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

global.fetch = jest.fn()

describe('Tree Component', () => {
    const mockSuccessfulFetch = (data: unknown) =>
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => data,
        })

    const mockErrorFetch = () =>
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'))

    it('Should renders loading state', () => {
        render(<Tree />)
        expect(screen.getByTestId('placeholder')).toBeInTheDocument()
    })

    it('Should render tree nodes and hide placeholder when data is fetched', async () => {
        mockSuccessfulFetch({ pages: {} })
        mockSuccessfulFetch([])

        render(<Tree />)

        await waitFor(() => {
            expect(screen.queryByTestId('placeholder')).toBeNull()
        })
    })

    it('Should handles fetch errors', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error')
        mockErrorFetch()
        render(<Tree />)

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Error fetching data:',
                expect.any(Error)
            )
        })

        consoleErrorSpy.mockRestore()
    })

    it('Should updates active node on TreeNode click', async () => {
        const mockTreeData = {
            node0: {
                id: 'node0',
                title: 'Node Text',
                url: '',
                parentId: '',
                level: 0,
                tabIndex: 0,
                doNotShowWarningLink: true,
                pages: [],
            },
        }
        const mockTopLevelIds: string[] = ['node0']
        mockSuccessfulFetch({ pages: mockTreeData })
        mockSuccessfulFetch(mockTopLevelIds)

        render(<Tree />)

        await waitFor(() => {
            expect(screen.queryByTestId('placeholder')).toBeNull()
        })

        const treeNode: HTMLElement = screen.getByText('Node Text')
        userEvent.click(treeNode)

        await waitFor(() => {
            expect(treeNode.parentNode).toHaveClass('active')
        })
    })
})
