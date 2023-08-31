import React, { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

// Mock the ThemeContext.Provider
jest.mock('./context/ThemeContext', () => ({
    ThemeContext: {
        Consumer: function MockConsumer({
            children,
        }: {
            children: (value: string) => ReactNode
        }) {
            return children('light') // Mock the theme value as 'light'
        },
    },
}))

//todo
xdescribe('App Component', () => {
    it('changes theme when the toggle is clicked', () => {
        render(<App />)

        // Check that the initial theme is 'dark'
        expect(screen.getByTestId('theme-switch-checkbox')).toBeChecked()

        // Simulate a click on the toggle
        fireEvent.click(screen.getByTestId('theme-switch-checkbox'))

        // Check that the theme changes to 'light'
        expect(screen.getByTestId('theme-switch-checkbox')).not.toBeChecked()
    })
})
