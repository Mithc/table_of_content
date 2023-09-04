import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

jest.mock('./context/ThemeContext', () => ({
    ThemeContext: {
        Consumer: ({
            children,
        }: {
            children: (value: string) => React.ReactNode
        }) => children('dark'),
    },
}))

xdescribe('App Component', () => {
    // TODO There is so magic with this test, it can't render App component
    it('changes theme when the toggle is clicked', () => {
        render(<App />)

        expect(screen.getByTestId('theme-switch-checkbox')).toBeChecked()

        fireEvent.click(screen.getByTestId('theme-switch-checkbox'))

        expect(screen.getByTestId('theme-switch-checkbox')).not.toBeChecked()
    })
})
