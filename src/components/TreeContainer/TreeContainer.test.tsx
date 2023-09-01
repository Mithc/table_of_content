import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import TreeContainer from './TreeContainer'

// Mock fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ pages: {} }),
    })
) as never

describe('Tree Component', () => {
    const mockSuccessfulFetch = (data: unknown) =>
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => data,
        })

    const mockErrorFetch = () =>
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'))
    it('renders loading placeholder initially', () => {
        render(<TreeContainer />)

        expect(screen.getByTestId('placeholder')).toBeInTheDocument()
    })

    it('Should make backend call', async () => {
        render(<TreeContainer />)

        // Ensure fetch is called with the correct URLs
        expect(fetch).toHaveBeenCalledTimes(2)
        expect(fetch).toHaveBeenCalledWith('http://localhost:4200/entities')
        expect(fetch).toHaveBeenCalledWith('http://localhost:4200/topLevelIds')
    })

    it('Should hide placeholder when data is fetched', () => {
        mockSuccessfulFetch({ pages: {} })
        mockSuccessfulFetch([])

        render(<TreeContainer />)

        setTimeout(
            () => expect(screen.queryByTestId('placeholder')).toBeNull(),
            100
        )
    })

    it('Should render tree nodes and hide placeholder when data is fetched', async () => {
        mockErrorFetch()
        mockSuccessfulFetch([])

        render(<TreeContainer />)

        await waitFor(() => {
            expect(
                screen.queryByText('Error during loading')
            ).toBeInTheDocument()
        })
    })

    it('Should render data when fetch is successful', () => {
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
        mockSuccessfulFetch({ pages: mockTreeData })
        mockSuccessfulFetch([])

        setTimeout(
            () => expect(screen.queryByText('Node Text')).toBeInTheDocument(),
            100
        )
    })
})
